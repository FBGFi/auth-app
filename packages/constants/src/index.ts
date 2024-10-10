export const REQUEST_ID_HEADER_KEY = "X-Request-Id";

/**
 * Error class for manually throwing requests in API
 */
export class HTTPResponseError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}
