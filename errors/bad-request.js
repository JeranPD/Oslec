import { StatusCodes } from "http-status-codes";
import APIError from "./custom-api.js";

class BadRequestError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
