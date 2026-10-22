import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export interface PublicPlan {
  id: number;
  name: string;
  slug: string;
  badge_label?: string | null;
  description?: string | null;
  price_monthly: number;
  price_yearly: number;
  trial_days: number;
  features: string[];
  is_highlighted: boolean;
  sort_order: number;
}

export interface SubscriptionPlan extends PublicPlan {
  limits: Record<string, any>;
  is_active: boolean;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
}

export interface PlanPayload {
  name: string;
  slug: string;
  badge_label?: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  trial_days: number;
  features: string[];
  limits?: Record<string, any>;
  is_active: boolean;
  is_highlighted: boolean;
  sort_order: number;
}

export interface DeletePlanResult {
  success: boolean;
  action: "deleted" | "archived";
  message: string;
  is_active?: boolean;
}

export const planService = {
  /**
   * Fetch active plans for public pricing page and registration modal.
   */
  async getPublicPlans(): Promise<PublicPlan[]> {
    return apiClient<PublicPlan[]>(API_ENDPOINTS.PLANS.LIST, {
      method: "GET",
    });
  },

  /**
   * Super Admin: Fetch all plans (active + inactive) with subscriber counts.
   */
  async getAdminPlans(): Promise<SubscriptionPlan[]> {
    return apiClient<SubscriptionPlan[]>(API_ENDPOINTS.ADMIN.PLANS, {
      method: "GET",
    });
  },

  /**
   * Super Admin: Create new subscription plan.
   */
  async createPlan(payload: PlanPayload): Promise<SubscriptionPlan> {
    return apiClient<SubscriptionPlan>(API_ENDPOINTS.ADMIN.PLANS, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Super Admin: Update plan pricing, features, limits, or status.
   */
  async updatePlan(id: number, payload: Partial<PlanPayload>): Promise<SubscriptionPlan> {
    return apiClient<SubscriptionPlan>(API_ENDPOINTS.ADMIN.PLAN_DETAIL(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Super Admin: Delete or archive plan.
   */
  async deletePlan(id: number): Promise<DeletePlanResult> {
    return apiClient<DeletePlanResult>(API_ENDPOINTS.ADMIN.PLAN_DETAIL(id), {
      method: "DELETE",
    });
  },

  /**
   * Tenant: Fetch active plan quotas, current resource consumption and feature flags.
   */
  async getTenantQuotas(tenantId?: number): Promise<TenantQuotaSummary> {
    const url = tenantId ? `/api/v1/tenant/quotas?tenant_id=${tenantId}` : "/api/v1/tenant/quotas";
    return apiClient<TenantQuotaSummary>(url, {
      method: "GET",
    });
  },
};

export interface TenantQuotaSummary {
  plan_name: string;
  plan_slug: string;
  trial_days: number;
  limits: Record<string, any>;
  usage: {
    staff: {
      used: number;
      max: number;
      is_unlimited: boolean;
      is_reached: boolean;
    };
    branches: {
      used: number;
      max: number;
      is_unlimited: boolean;
      is_reached: boolean;
    };
  };
  features: {
    whatsapp_invoicing: boolean;
    fbr_integration: boolean;
    multi_godown: boolean;
    custom_roles: boolean;
  };
}
