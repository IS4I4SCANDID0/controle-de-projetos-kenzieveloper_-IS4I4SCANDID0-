// import { NextFunction, Request, Response } from "express";
// import { QueryResult } from "pg";
// import { client } from "../database/database";
// import AppError from "../error";

// const verifyDeveloperInfos = async(request: Request, response: Response, next: NextFunction): Promise<void> => {
//   const { email } = request.body;

//   if(!email) return next();

//   const queryDeveloperInfo: QueryResult = await client.query(
//     `SELECT * FROM "developerInfos";`,
//     [email]
//   );
//   if(queryDeveloperInfo.rowCount !== 0 ) throw new AppError("Email already exists.", 409);
  
//   return next();
// };

// export { verifyDeveloperInfos }