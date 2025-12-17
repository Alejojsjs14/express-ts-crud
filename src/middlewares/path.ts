import httpStatus from "http-status";
import type { RequestHandler } from "express";

/**
 * Handles errors for undefined routes by sending a 404 response.
 * @function errorPath
 * @param req - The incoming request object.
 * @param res - The response object to send the 404 error.
 * @returns Sends a JSON response with the error status and message.
 * @example
 * If a request is made to an undefined route, e.g., /api/nonexistent,
 * the response will be:
 * {
 *   "status": 404,
 *   "message": "The route /api/nonexistent does not exist"
 * }
 */
export const errorPath: RequestHandler = (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: `The route ${req.originalUrl} does not exist`,
  });
};
