export type ApiResponse = {
  statusCode: number;
  statusMessage: string;
  errorMessage: string | null;
  data: any;
};

export const ApiResponseStatusCode = {
  Success: 200,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
};

export const ApiResponseMessage = {
  Success: 'Request successful',
  BadRequest: 'Bad request',
  signup: 'Signup successful',
  login : 'Login successful',
  NotFound: 'Resource not found',
  InternalServerError: 'Internal server error',
};

export const ApiResponseErrorMessage = {
  BadRequest: 'The request could not be processed',
  InternalServerError: 'An unexpected error occurred',
};
