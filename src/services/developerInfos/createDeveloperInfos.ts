import { QueryConfig, QueryResult } from "pg";
import { TDeveloperInfos, TDeveloperInfosRequest } from "../../interfaces/developers.interfaces";
import { client } from "../../database/database";
import AppError from "../../error";
import format from "pg-format";

const createDeveloperInfosService = async (developerId: number, developerInfosRequest: TDeveloperInfosRequest): Promise<TDeveloperInfos> => {
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

  const queryFormatDevInfos: string = format(
    `
      INSERT INTO 
        developerInfos (%I)
      VALUES 
        (%L)
      RETURNING *; 
    `,
    Object.keys(developerInfosRequest),
    Object.values(developerInfosRequest)
  );
  const queryResultDeveloperInfos: QueryResult = await client.query(queryFormatDevInfos)

  const queryStringUpdateDevInfo: string = `
    UPDATE
      developerInfos
    SET
      "developerId" = $1
    WHERE
      id = $2
  `
  const queryConfigUpdateDev: QueryConfig = {
    text: queryStringUpdateDevInfo,
    values: [queryResultDeveloperInfos.rows[0].id, developerId]
  }
  await client.query(queryConfigUpdateDev)
 
  return queryResultDeveloperInfos.rows[0]
};

export { createDeveloperInfosService }
