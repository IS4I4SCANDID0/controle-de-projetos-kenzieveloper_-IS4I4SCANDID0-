import { QueryConfig, QueryResult } from "pg";
import { TDeveloperInfos, TDeveloperInfosRequest } from "../../interfaces/developers.interfaces";
import { client } from "../../database/database";
import AppError from "../../error";
import format from "pg-format";

const createDeveloperInfosService = async (developerId: number, developerInfosRequest: TDeveloperInfosRequest): Promise<TDeveloperInfos> => {
  const checkQuery = `
    SELECT * FROM "developerInfos" WHERE "developerId" = $1;
  `;
  const checkResult = await client.query(checkQuery, [developerId]);

  if (checkResult.rows.length > 0) {
    throw new AppError("Developer infos already exists.", 409);
  };

  const validPreferredOSValues = ["Windows", "Linux", "MacOS"]
  if (!Object.values(validPreferredOSValues).includes(developerInfosRequest.preferredOS)) {
    throw new AppError("Invalid OS option.", 400);
  };
  
  const queryFormatDeveloperInfo: string = format(
    `
      INSERT INTO
        "developerInfos" ("developerSince", "preferredOS", "developerId")
      VALUES
        (%L, %L, %L) 
      RETURNING *;
    `,
    developerInfosRequest.developerSince,
    developerInfosRequest.preferredOS,
    developerId
  );
  const queryResultDeveloperInfos: QueryResult<TDeveloperInfos> = await client.query(queryFormatDeveloperInfo);

  const queryStringUpdateDevInfo: string = 
  `
    UPDATE
      "developerInfos"
    SET
     "developerId" = $1
    WHERE
      id = $2
  `
  const queryConfigUpdateDev: QueryConfig = {
    text: queryStringUpdateDevInfo,
    values: [developerId, queryResultDeveloperInfos.rows[0].id]
  }
  await client.query(queryConfigUpdateDev)

  return queryResultDeveloperInfos.rows[0]
};

export { createDeveloperInfosService }