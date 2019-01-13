export interface CustomErrorResponse {
  status: string;
  message?: string;
  name?: string;
  stack?: any;
}

export interface CustomSuccessResponse {
  status: string;
  message?: string;
  data?: object;
}
