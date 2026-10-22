import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export interface PermissionItem {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  module: string;
}


export interface ModulePermissionsGroup {
  module: string;
  label: string;
  permissions: PermissionItem[];
}

export interface RoleMatrixItem {
  id: number;
  tenant_id?: number | null;
  name: string;
  description?: string | null;
  is_system: boolean;
  user_count: number;
  permission_ids: number[];
  permission_codes: string[];
}

export interface CreateRolePayload {
  name: string;
  description?: string;
  permission_ids: number[];
}

export interface UpdateRolePayload {
  name?: string;
  description?: string;
  permission_ids?: number[];
}

export interface CreatePermissionPayload {
  module: string;
  code: string;
  name: string;
  description?: string;
}

export interface UpdatePermissionPayload {
  module?: string;
  code?: string;
  name?: string;
  description?: string;
}

export const rolesService = {
  /**
   * Fetch all system master permissions catalog grouped by module.
   */
  async getPermissions(): Promise<ModulePermissionsGroup[]> {
    return apiClient<ModulePermissionsGroup[]>(API_ENDPOINTS.TENANT.PERMISSIONS, {
      method: "GET",
    });
  },

  /**
   * Fetch roles with assigned permissions and user counts for active business.
   */
  async getRolesMatrix(tenantId?: number): Promise<RoleMatrixItem[]> {
    const url = tenantId
      ? `${API_ENDPOINTS.TENANT.ROLES_MATRIX}?tenant_id=${tenantId}`
      : API_ENDPOINTS.TENANT.ROLES_MATRIX;
    return apiClient<RoleMatrixItem[]>(url, {
      method: "GET",
    });
  },

  /**
   * Create a new custom role with selected permissions.
   */
  async createRole(payload: CreateRolePayload, tenantId?: number): Promise<RoleMatrixItem> {
    const url = tenantId
      ? `${API_ENDPOINTS.TENANT.ROLES}?tenant_id=${tenantId}`
      : API_ENDPOINTS.TENANT.ROLES;
    return apiClient<RoleMatrixItem>(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update role permissions matrix or role details.
   */
  async updateRole(
    roleId: number,
    payload: UpdateRolePayload,
    tenantId?: number
  ): Promise<RoleMatrixItem> {
    const endpoint = API_ENDPOINTS.TENANT.ROLE_DETAIL(roleId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<RoleMatrixItem>(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a custom role.
   */
  async deleteRole(roleId: number, tenantId?: number): Promise<{ message: string }> {
    const endpoint = API_ENDPOINTS.TENANT.ROLE_DETAIL(roleId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<{ message: string }>(url, {
      method: "DELETE",
    });
  },

  /**
   * Create a new permission action under a module.
   */
  async createPermission(payload: CreatePermissionPayload, tenantId?: number): Promise<PermissionItem> {
    const url = tenantId
      ? `${API_ENDPOINTS.TENANT.PERMISSIONS}?tenant_id=${tenantId}`
      : API_ENDPOINTS.TENANT.PERMISSIONS;
    return apiClient<PermissionItem>(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing permission action.
   */
  async updatePermission(
    permissionId: number,
    payload: UpdatePermissionPayload,
    tenantId?: number
  ): Promise<PermissionItem> {
    const endpoint = API_ENDPOINTS.TENANT.PERMISSION_DETAIL(permissionId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<PermissionItem>(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a permission action.
   */
  async deletePermission(permissionId: number, tenantId?: number): Promise<{ message: string }> {
    const endpoint = API_ENDPOINTS.TENANT.PERMISSION_DETAIL(permissionId);
    const url = tenantId ? `${endpoint}?tenant_id=${tenantId}` : endpoint;
    return apiClient<{ message: string }>(url, {
      method: "DELETE",
    });
  },
};
