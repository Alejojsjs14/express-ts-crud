//@ts-check
import httpStatus from "http-status";
import type { Request, Response, NextFunction } from "express";
import { logger } from "#utils/logger";

/**
 * Handles errors and sends an error response with the appropriate status code and message.
 *
 * This middleware function is used to catch and handle errors that occur during the processing of requests.
 * It extracts the status code and message from the error object and sends a JSON response with the error details.
 * If no specific status code is provided in the error object, it defaults to `500 Internal Server Error`.
 * @function errorHandler
 * @param error - The error object containing details about the error.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns Sends a JSON response with the error status, code, and message.
 * @example
 * // Define a route that throws an error
 * app.get('/api/error', (req, res, next) => {
 *   const error = new Error('Something went wrong');
 *   error.statusCode = 400; // Custom status code
 *   next(error); // Pass the error to the error handler
 * });
 *
 * // Use the errorHandler middleware to handle errors
 * app.use(errorHandler);
 * // If a request is made to /api/error, the response will be:
 * // {
 * //   "success": false,
 * //   "status": 400,
 * //   "code": 500,
 * //   "message": "Something went wrong"
 * // }
 */
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof Error) {
    logger.error(error.toString());
    const { message } = error;
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Ha ocurrido un error desconocido",
  });
};
