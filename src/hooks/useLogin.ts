import { apiRequest } from '../lib/api';

export async function loginUser(data: { email: string; password: string }) {
  return apiRequest('/api/auth/login', 'POST', data);
}
