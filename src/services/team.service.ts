import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export interface StaffRole {
  id: number;
  name: string;
  description?: string | null;
  is_system: boolean;
  permissions?: Record<string, any>;
}

export interface StaffMember {
  id: number;
  user_id: number;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  role_id: number;
  role_name: string;
  is_owner: boolean;
  is_active: boolean;
  max_discount_pct: number;
  joined_at: string;
  last_login_at?: string | null;
}

export interface StaffListResponse {
  items: StaffMember[];
  total: number;
  used_staff: number;
  max_staff: number | null;
  plan_name: string;
  can_add_more: boolean;
  can_manage?: boolean;
}


export interface StaffCreatePayload {
  full_name: string;
  phone?: string;
  email?: string;
  password: string;
  role_id: number;
  max_discount_pct?: number;
}

export interface StaffUpdatePayload {
  full_name?: string;
  role_id?: number;
  max_discount_pct?: number;
  is_active?: boolean;
  password?: string;
}

export const teamService = {
  /**
   * Get available roles that can be assigned to staff members.
   */
  async getRoles(): Promise<StaffRole[]> {
    return apiClient<StaffRole[]>(API_ENDPOINTS.TENANT.ROLES, {
      method: "GET",
    });
  },

  /**
   * List staff members and plan quota usage for the active business.
   */
  async getStaffList(tenantId?: number): Promise<StaffListResponse> {
    const url = tenantId
      ? `${API_ENDPOINTS.TENANT.USERS}?tenant_id=${tenantId}`
      : API_ENDPOINTS.TENANT.USERS;
    return apiClient<StaffListResponse>(url, {
      method: "GET",
    });
  },

  /**
   * Create and provision a new staff user.
   */
  async createStaff(payload: StaffCreatePayload, tenantId?: number): Promise<StaffMember> {
    const url = tenantId
      ? `${API_ENDPOINTS.TENANT.USERS}?tenant_id=${tenantId}`
      : API_ENDPOINTS.TENANT.USERS;
    return apiClient<StaffMember>(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update staff member details, role, status, or discount limit.
   */
  async updateStaff(
    staffId: number,
    payload: StaffUpdatePayload,
    tenantId?: number
  ): Promise<StaffMember> {
    const endpoint = API_ENDPOINTS.TENANT.USER_DETAIL(staffId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<StaffMember>(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Remove staff member from business.
   */
  async deleteStaff(staffId: number, tenantId?: number): Promise<{ message: string }> {
    const endpoint = API_ENDPOINTS.TENANT.USER_DETAIL(staffId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<{ message: string }>(url, {
      method: "DELETE",
    });
  },
};
