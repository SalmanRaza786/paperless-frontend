"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  type User,
  type Tenant,
  type LoginCredentials,
  type AuthResponse,
} from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialIsAuthenticated = false,
}: {
  children: React.ReactNode;
  initialIsAuthenticated?: boolean;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [tenant, setTenant] = React.useState<Tenant | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialIsAuthenticated);
  const [isLoading, setIsLoading] = React.useState(!initialIsAuthenticated);
  const router = useRouter();

  React.useEffect(() => {
    // Hydrate initial auth from localStorage immediately on mount
    const storedUser = authService.getStoredUser();
    const storedTenant = authService.getStoredTenant();
    const token = authService.getAccessToken();

    if (token && storedUser) {
      // Ensure cookie matches localStorage token for Next.js middleware
      document.cookie = `paperless_access_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      setUser(storedUser);
      setTenant(storedTenant);
      setIsAuthenticated(true);
      setIsLoading(false);

      // Validate session in background
      authService
        .getCurrentUser()
        .then((freshUser) => {
          setUser(freshUser);
          if (freshUser.current_tenant) {
            setTenant(freshUser.current_tenant);
            localStorage.setItem("paperless_tenant", JSON.stringify(freshUser.current_tenant));
          }
        })
        .catch((err: unknown) => {
          // Robust session protection: ONLY clear auth if server explicitly returns 401 Unauthorized
          const status = (err as any)?.status;
          if (status === 401 || status === 403) {
            authService.clearAuth();
            setUser(null);
            setTenant(null);
            setIsAuthenticated(false);
          }
          // On network offline, server 500, or timeout, keep stored session active!
        });
    } else if (token) {
      // Cookie/token exists but user object not in localStorage yet - fetch it
      authService
        .getCurrentUser()
        .then((freshUser) => {
          setUser(freshUser);
          setIsAuthenticated(true);
          if (freshUser.current_tenant) {
            setTenant(freshUser.current_tenant);
          }
        })
        .catch((err: unknown) => {
          const status = (err as any)?.status;
          if (status === 401 || status === 403) {
            authService.clearAuth();
            setUser(null);
            setTenant(null);
            setIsAuthenticated(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setTenant(response.current_tenant);
      setIsAuthenticated(true);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignored
    } finally {
      setUser(null);
      setTenant(null);
      setIsAuthenticated(false);
      router.replace("/login");
    }
  };

  const refreshUser = async () => {
    try {
      const freshUser = await authService.getCurrentUser();
      setUser(freshUser);
      setIsAuthenticated(true);
      if (freshUser.current_tenant) {
        setTenant(freshUser.current_tenant);
        localStorage.setItem("paperless_tenant", JSON.stringify(freshUser.current_tenant));
      }
    } catch {
      // Ignored
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        isAuthenticated: isAuthenticated || !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    // Fallback safe dummy if used outside provider
    return {
      user: null,
      tenant: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {
        throw new Error("AuthProvider missing");
      },
      logout: async () => {},
      refreshUser: async () => {},
    };
  }
  return context;
}
