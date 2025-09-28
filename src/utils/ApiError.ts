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

    // Set the prototype explicitly (needed when extending built-in classes in TS)
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
