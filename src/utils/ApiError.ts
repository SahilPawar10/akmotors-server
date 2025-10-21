/**
 * Custom API Error class for consistent error handling
 */
export default class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational: boolean = true, stack?: string) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Fix prototype chain (important when extending built-in classes in TypeScript)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
