// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}

// User Types
export interface User {
  id: number;
  name: string;
  name_kh: string;
  email: string;
  phone: string;
  profile_picture?: string;
  profile_picture_url?: string;
  status: string;
  roles?: Role[];
  permissions?: Permission[];
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email_or_phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_at: string;
  expires_at_original: string;
  expires_in: number;
  user: User;
}

export interface RegisterRequest {
  name_en: string;
  name_kh: string;
  email: string;
  phone: string;
  password: string;
}

// Role Types
export interface Role {
  id: number;
  role_name: string;
  display_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleRequest {
  role_name: string;
  display_name: string;
  description?: string;
}
}

export interface UpdateRoleRequest {
  role_name?: string;
  display_name?: string;
  description?: string;
}

// Permission Types
export interface Permission {
  id: number;
  permission_name: string;
  display_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Pipeline Types
export interface Pipeline {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  users?: User[];
}

export interface CreatePipelineRequest {
  name: string;
  description?: string;
}

export interface UpdatePipelineRequest {
  name?: string;
  description?: string;
}

// Password Types
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordRequest {
  email: string;
  new_password: string;
  confirm_password: string;
}
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  email: string;
}
