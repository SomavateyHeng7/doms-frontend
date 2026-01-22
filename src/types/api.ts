// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  is_suspended?: boolean;
  is_banned?: boolean;
  roles?: Role[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  [key: string]: any;
}

// Role Types
export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  permissions?: Permission[];
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
}

// Permission Types
export interface Permission {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

// Pipeline Types
export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  config?: any;
  created_at?: string;
  updated_at?: string;
  users?: User[];
}

export interface CreatePipelineRequest {
  name: string;
  description?: string;
  config?: any;
}

export interface UpdatePipelineRequest {
  name?: string;
  description?: string;
  config?: any;
}

// Password Types
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  email: string;
}
