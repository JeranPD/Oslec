import { StatusCodes } from "http-status-codes";
import APIError from "./custom-api.js";

class UnAuthenticatedError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
