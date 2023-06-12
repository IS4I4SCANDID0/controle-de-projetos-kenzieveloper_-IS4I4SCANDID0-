import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import AppError from "../error";
import { client } from "../database/database";

const verifyDevIdParams = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  let developerId: number = parseInt(request.params.id);

  if ((request.method === "POST" || request.method === "PATCH") && request.baseUrl === "/developers/:id/infos"
  ) {
    developerId = request.body.developerId;
  }

  const queryStringSelectDev: string = `
    SELECT
      *
    FROM
      developers
    WHERE
      id = $1
  `;
  const queryConfigSelectDev: QueryConfig = {
    text: queryStringSelectDev,
    values: [developerId],
  };

  const queryResultSelectDev: QueryResult = await client.query(queryConfigSelectDev);

  if (queryResultSelectDev.rowCount === 0) {
    throw new AppError("Developer not found", 404);
  }
  return next();
};

export { verifyDevIdParams };
