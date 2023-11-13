// errorHandlerTypes.ts
export interface ErrorResponseType {
    data?: {
      message?: string;
      errors?: Array<{ [key: string]: string }>;
    };
    originalStatus?: number;
    status?: number;
    response?: {
      data?: {
        message?: string;
        errors?: Array<{ [key: string]: string }>;
      };
    };
    message?: string;
  }
  