import format from "pg-format";
import { TDeveloper, TDeveloperRequest } from "../../interfaces/developers.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database/database";

const createDevelopersService = async (developerData: TDeveloperRequest): Promise<TDeveloper> => {
  const values: string[] = Object.values(developerData);
  const keys: string[] = Object.keys(developerData);

  const formatString: string = format(
    `
      INSERT INTO 
        developers (%I)
      VALUES 
        (%L)
      RETURNING *;
    `,
    keys,
    values
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(formatString)
  return queryResult.rows[0];
};

export { createDevelopersService }