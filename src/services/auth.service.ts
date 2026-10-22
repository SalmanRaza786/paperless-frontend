import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export interface User {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_superadmin: boolean;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  preferred_otp_channel: "phone_sms" | "phone_whatsapp" | "email";
  current_tenant?: Tenant | null;
  available_tenants?: Tenant[];
}

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  plan_tier: "free_trial" | "basic" | "standard" | "enterprise";
  is_read_only: boolean;
  role_name?: string | null;
  permissions?: string[];
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  remember_me?: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
  current_tenant: Tenant | null;
  available_tenants: Tenant[];
}

export interface SelfRegisterPayload {
  business_name: string;
  legal_name?: string;
  city: string;
  phone: string;
  ntn?: string;
  strn?: string;
  address?: string;
  plan_tier: "free_trial" | "basic" | "standard" | "enterprise";
  owner_full_name: string;
  owner_phone: string;
  owner_email: string;
  owner_password: string;
  otp_channel?: "email" | "phone_sms" | "phone_whatsapp";
}

export interface RegisterInitiatedResult {
  success: boolean;
  verification_id: number;
  destination: string;
  channel: string;
  resend_available_in: number;
  message: string;
  debug_otp?: string;
}

export interface VerifyRegistrationOtpPayload {
  verification_id: number;
  otp_code: string;
}

export interface ResendOtpResult {
  success: boolean;
  verification_id: number;
  destination: string;
  channel: string;
  resend_available_in: number;
  message: string;
  debug_otp?: string;
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: "paperless_access_token",
  REFRESH_TOKEN: "paperless_refresh_token",
  USER: "paperless_user",
  TENANT: "paperless_tenant",
} as const;

export const authService = {
  /**
   * Authenticate user with Email or Phone.
   * Super Admin logs in directly without OTP.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await apiClient<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    this.saveAuth(data);
    return data;
  },

  /**
   * Initiate public self-service registration.
   * Sends 6-digit verification code to the owner's email.
   */
  async register(payload: SelfRegisterPayload): Promise<RegisterInitiatedResult> {
    return apiClient<RegisterInitiatedResult>(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Verify the 6-digit Email OTP and automatically provision the tenant & owner account.
   */
  async verifyRegistrationOtp(payload: VerifyRegistrationOtpPayload): Promise<AuthResponse> {
    const data = await apiClient<AuthResponse>(API_ENDPOINTS.AUTH.VERIFY_REGISTRATION_OTP, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    this.saveAuth(data);
    return data;
  },

  /**
   * Resend a fresh 6-digit OTP code with cooldown protection.
   */
  async resendOtp(verification_id: number): Promise<ResendOtpResult> {
    return apiClient<ResendOtpResult>(API_ENDPOINTS.AUTH.RESEND_OTP, {
      method: "POST",
      body: JSON.stringify({ verification_id }),
    });
  },

  /**
   * Fetch current authenticated user profile from backend.
   */
  async getCurrentUser(): Promise<User> {
    return apiClient<User>(API_ENDPOINTS.AUTH.ME, {
      method: "GET",
    });
  },

  /**
   * Log out user, revoking server session and clearing local storage.
   */
  async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    try {
      if (refreshToken) {
        await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      this.clearAuth();
    }
  },

  saveAuth(data: AuthResponse): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    if (data.current_tenant) {
      localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(data.current_tenant));
    }

    // Set cookie for Next.js server middleware
    const maxAge = data.expires_in || 86400;
    document.cookie = `paperless_access_token=${data.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  },

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (stored) return stored;
    // Fallback: read cookie if available
    const match = document.cookie.match(/(?:^|;\s*)paperless_access_token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getStoredTenant(): Tenant | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEYS.TENANT);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TENANT);

    // Clear cookie for Next.js server middleware
    document.cookie = "paperless_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  },
};
