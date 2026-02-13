// Core API request function
export async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `API Error: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Authentication APIs
export async function login(emailOrPhone: string, password: string) {
  return apiRequest('/api/login', 'POST', { 
    email_or_phone: emailOrPhone, 
    password 
  });
}

export async function register(userData: {
  name_en: string;
  name_kh: string;
  email: string;
  phone: string;
  password: string;
}) {
  return apiRequest('/api/register', 'POST', userData);
}

export async function logout(token: string) {
  return apiRequest('/api/logout', 'POST', undefined, token);
}

export async function resetPassword(
  email: string,
  newPassword: string,
  confirmPassword: string
) {
  return apiRequest('/api/reset-password', 'POST', { 
    email, 
    new_password: newPassword,
    confirm_password: confirmPassword 
  });
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  token: string
) {
  return apiRequest(
    '/api/change-password',
    'POST',
    { 
      old_password: oldPassword, 
      new_password: newPassword,
      confirm_password: confirmPassword 
    },
    token
  );
}

// User Profile APIs
export async function getProfile(token: string) {
  return apiRequest('/api/profile', 'GET', undefined, token);
}

export async function updateProfile(userData: {
  name_en?: string;
  name_kh?: string;
  phone?: string;
}, token: string) {
  return apiRequest('/api/profile', 'PUT', userData, token);
}

// User Management APIs (Admin)
export async function getUsers(token: string) {
  return apiRequest('/api/users', 'GET', undefined, token);
}

export async function getUser(userId: string, token: string) {
  return apiRequest(`/api/users/${userId}`, 'GET', undefined, token);
}

export async function updateUser(userId: string, userData: any, token: string) {
  return apiRequest(`/api/users/${userId}`, 'PUT', userData, token);
}

export async function suspendUser(userId: string, token: string) {
  return apiRequest(`/api/users/${userId}/suspend`, 'POST', undefined, token);
}

export async function unsuspendUser(userId: string, token: string) {
  return apiRequest(`/api/users/${userId}/unsuspend`, 'POST', undefined, token);
}

export async function banUser(userId: string, token: string) {
  return apiRequest('/api/users/ban', 'POST', { user_id: userId }, token);
}

export async function assignRolesToUser(
  userId: string,
  roleIds: string[],
  token: string
) {
  return apiRequest(
    '/api/users/assign-roles',
    'POST',
    { user_id: userId, role_ids: roleIds },
    token
  );
}

export async function unassignRolesFromUser(
  userId: string,
  roleIds: string[],
  token: string
) {
  return apiRequest(
    '/api/users/unassign-roles',
    'POST',
    { user_id: userId, role_ids: roleIds },
    token
  );
}

// Role Management APIs
export async function createRole(roleData: any, token: string) {
  return apiRequest('/api/roles', 'POST', roleData, token);
}

export async function getRoles(token: string) {
  return apiRequest('/api/roles', 'GET', undefined, token);
}

export async function getRole(roleId: string, token: string) {
  return apiRequest(`/api/roles/${roleId}`, 'GET', undefined, token);
}

export async function updateRole(roleId: string, roleData: any, token: string) {
  return apiRequest(`/api/roles/${roleId}`, 'PUT', roleData, token);
}

export async function deleteRole(roleId: string, token: string) {
  return apiRequest(`/api/roles/${roleId}/delete`, 'POST', undefined, token);
}

export async function assignPermissionsToRole(
  roleId: string,
  permissionIds: string[],
  token: string
) {
  return apiRequest(
    '/api/roles/assign-permissions',
    'POST',
    { role_id: roleId, permission_ids: permissionIds },
    token
  );
}

export async function getRolePermissions(roleId: string, token: string) {
  return apiRequest(`/api/roles/${roleId}/permissions`, 'GET', undefined, token);
}

// Permission APIs
export async function getPermissions(token: string) {
  return apiRequest('/api/permissions', 'GET', undefined, token);
}

// Pipeline Management APIs
export async function createPipeline(pipelineData: any, token: string) {
  return apiRequest('/api/pipeline', 'POST', pipelineData, token);
}

export async function getPipelines(token: string) {
  return apiRequest('/api/pipelines', 'GET', undefined, token);
}

export async function getPipeline(pipelineId: string, token: string) {
  return apiRequest(`/api/pipelines/${pipelineId}`, 'GET', undefined, token);
}

export async function updatePipeline(
  pipelineId: string,
  pipelineData: any,
  token: string
) {
  return apiRequest(`/api/pipelines/${pipelineId}`, 'PUT', pipelineData, token);
}

export async function deletePipeline(pipelineId: string, token: string) {
  return apiRequest(`/api/pipelines/${pipelineId}`, 'POST', undefined, token);
}

export async function assignUserToPipeline(
  pipelineId: string,
  userId: string,
  token: string
) {
  return apiRequest(
    '/api/pipelines/assign-user',
    'POST',
    { pipeline_id: pipelineId, user_id: userId },
    token
  );
}

export async function unassignUserFromPipeline(
  pipelineId: string,
  userId: string,
  token: string
) {
  return apiRequest(
    '/api/pipelines/unassign-user',
    'POST',
    { pipeline_id: pipelineId, user_id: userId },
    token
  );
}

// Legacy alias for backward compatibility
export async function getAdminRoles(token: string) {
  return getRoles(token);
}