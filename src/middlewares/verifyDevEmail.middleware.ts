import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database/database";
import AppError from "../error";

const verifyEmail = async(request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { email } = request.body;

  if(!email) return next();

  const queryDeveloperEmail: QueryResult = await client.query(
    `SELECT * FROM developers WHERE "email" = $1;`,
    [email]
  );
  if(queryDeveloperEmail.rowCount !== 0 ) throw new AppError("Email already exists.", 409);
  
  return next();
};

export { verifyEmail }