export async function getAdminRoles(token: string) {
  return apiRequest('/api/admin/roles', 'GET', undefined, token);
}
export async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}