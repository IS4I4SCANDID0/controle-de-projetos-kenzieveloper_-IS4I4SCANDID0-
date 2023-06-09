import { Request, Response, NextFunction } from "express";
import AppError from "../error";

const handleErrors = (error: ErrorConstructor, request: Request, response: Response, next: NextFunction): Response => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }
 
  console.error(error);
  return response.status(500).json({ message: "Internal server error!" });
}

export{ handleErrors } 
