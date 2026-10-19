/**
 * Standard API response and request type definitions.
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  status: string;
}

export interface ApiErrorResponse {
  detail: string | Array<{ loc: (string | number)[]; msg: string; type: string }>;
  status_code?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
