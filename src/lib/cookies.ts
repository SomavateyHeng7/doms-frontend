// Cookie utility functions for secure token storage

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

/**
 * Set a cookie
 * @param name Cookie name
 * @param value Cookie value
 * @param options Cookie options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof window === 'undefined') return;

  const {
    expires,
    path = '/',
    domain,
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    const expiresDate = expires instanceof Date ? expires : new Date(Date.now() + expires * 1000);
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  cookieString += `; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value
 * @param name Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
}

/**
 * Delete a cookie
 * @param name Cookie name
 * @param options Cookie options (path and domain should match the original cookie)
 */
export function deleteCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  if (typeof window === 'undefined') return;

  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Check if a cookie exists
 * @param name Cookie name
 * @returns True if cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

// Auth-specific cookie functions
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

/**
 * Set authentication token in cookie
 * @param token JWT token
 * @param expiresIn Expiration time in seconds
 */
export function setAuthToken(token: string, expiresIn?: number): void {
  setCookie(AUTH_TOKEN_KEY, token, {
    expires: expiresIn,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Get authentication token from cookie
 * @returns JWT token or null
 */
export function getAuthToken(): string | null {
  return getCookie(AUTH_TOKEN_KEY);
}

/**
 * Delete authentication token
 */
export function deleteAuthToken(): void {
  deleteCookie(AUTH_TOKEN_KEY, { path: '/' });
}

/**
 * Set user data in cookie
 * @param user User object
 */
export function setAuthUser(user: any): void {
  setCookie(AUTH_USER_KEY, JSON.stringify(user), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Get user data from cookie
 * @returns User object or null
 */
export function getAuthUser(): any | null {
  const userStr = getCookie(AUTH_USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data from cookie:', error);
    return null;
  }
}

/**
 * Delete user data from cookie
 */
export function deleteAuthUser(): void {
  deleteCookie(AUTH_USER_KEY, { path: '/' });
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  deleteAuthToken();
  deleteAuthUser();
}

/**
 * Check if user is authenticated
 * @returns True if user has valid token
 */
export function isAuthenticated(): boolean {
  return hasCookie(AUTH_TOKEN_KEY);
}
