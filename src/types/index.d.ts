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

export interface UserSummary {
  id: number;
  email_address: string;
  access_token: string;
  is_doer: boolean;
  assigned_doer?: number;
}
