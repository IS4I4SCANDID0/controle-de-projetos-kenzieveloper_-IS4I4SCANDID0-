import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/database";
import { TProject } from "../interfaces/projects.interfaces";
import AppError from "../error";

const verifyIdProject = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const projectId = request.params.id;

  const queryString: string = `
    SELECT
      *
    FROM
      projects
    WHERE
      id = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId]
  };
  const queryResult: QueryResult = await client.query(queryConfig);

  if(queryResult.rowCount === 0) {
    throw new AppError("Project not found.", 404)
  }
  return next();
};

export { verifyIdProject }