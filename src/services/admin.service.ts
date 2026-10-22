import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export interface TenantOwner {
  id: number;
  full_name: string;
  phone: string | null;
  email: string | null;
}

export interface TenantItem {
  id: number;
  name: string;
  slug: string;
  city: string;
  phone: string;
  email: string | null;
  status: "trial" | "active" | "past_due" | "suspended" | "cancelled";
  plan_tier: "free_trial" | "basic" | "standard" | "enterprise";
  trial_ends_at: string;
  subscription_ends_at: string | null;
  is_read_only: boolean;
  owner: TenantOwner | null;
  total_users: number;
  created_at: string;
}

export interface PaginatedTenants {
  items: TenantItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface CreateTenantPayload {
  name: string;
  legal_name?: string;
  ntn?: string;
  strn?: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  plan_tier: "free_trial" | "basic" | "standard" | "enterprise";
  subscription_days: number;
  owner_full_name: string;
  owner_phone: string;
  owner_email?: string;
  owner_password: string;
}

export interface CreateTenantResult {
  tenant: TenantItem;
  owner_credentials: {
    identifier: string;
    password: string;
    full_name: string;
    is_new_account: boolean;
  };
  message: string;
}

export const adminService = {
  async listTenants(params: {
    search?: string;
    status?: string;
    plan?: string;
    page?: number;
    size?: number;
  } = {}): Promise<PaginatedTenants> {
    return apiClient<PaginatedTenants>(API_ENDPOINTS.ADMIN.TENANTS, {
      method: "GET",
      params: {
        search: params.search,
        status: params.status && params.status !== "all" ? params.status : undefined,
        plan: params.plan && params.plan !== "all" ? params.plan : undefined,
        page: params.page ?? 1,
        size: params.size ?? 20,
      },
    });
  },

  async createTenant(payload: CreateTenantPayload): Promise<CreateTenantResult> {
    return apiClient<CreateTenantResult>(API_ENDPOINTS.ADMIN.TENANTS, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateTenantStatus(
    tenantId: number,
    payload: {
      status?: string;
      is_read_only?: boolean;
      extend_days?: number;
    }
  ): Promise<TenantItem> {
    return apiClient<TenantItem>(API_ENDPOINTS.ADMIN.TENANT_STATUS(tenantId), {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
