// API Error Handler Utility

export class ApiError extends Error {
  statusCode?: number;
  data?: any;

  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export function handleApiError(error: any): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error.response) {
    // Server responded with error status
    return new ApiError(
      error.response.data?.message || 'An error occurred',
      error.response.status,
      error.response.data
    );
  }

  if (error.request) {
    // Request made but no response received
    return new ApiError('No response from server. Please check your connection.', 0);
  }

  // Something else happened
  return new ApiError(error.message || 'An unexpected error occurred');
}

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}
