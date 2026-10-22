/**
 * Centralized backend API endpoint paths.
 */
export const API_ENDPOINTS = {
  HEALTH: "/health",
  DOCS: "/docs",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_REGISTRATION_OTP: "/auth/verify-registration-otp",
    RESEND_OTP: "/auth/resend-otp",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  ADMIN: {
    TENANTS: "/admin/tenants",
    TENANT_STATUS: (id: number) => `/admin/tenants/${id}/status`,
    PLANS: "/admin/plans",
    PLAN_DETAIL: (id: number) => `/admin/plans/${id}`,
  },
  PLANS: {
    LIST: "/plans",
  },
  TENANT: {
    USERS: "/tenant/users",
    ROLES: "/tenant/roles",
    USER_DETAIL: (id: number) => `/tenant/users/${id}`,
    PERMISSIONS: "/tenant/permissions",
    PERMISSION_DETAIL: (id: number) => `/tenant/permissions/${id}`,
    ROLES_MATRIX: "/tenant/roles-matrix",
    ROLE_DETAIL: (id: number) => `/tenant/roles/${id}`,
    BRANCHES: "/tenant/branches",
    BRANCH_DETAIL: (id: number) => `/tenant/branches/${id}`,
    BRANCH_SET_MAIN: (id: number) => `/tenant/branches/${id}/set-main`,
    QUOTAS: "/tenant/quotas",
  },
} as const;

