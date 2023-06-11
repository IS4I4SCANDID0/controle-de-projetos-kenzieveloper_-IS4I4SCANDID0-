import { QueryConfig, QueryResult } from "pg";
import { TDeveloperInfos, TDeveloperInfosRequest } from "../../interfaces/developers.interfaces";
import { client } from "../../database/database";
import AppError from "../../error";
import format from "pg-format";

const createDeveloperInfosService = async (developerId: number, developerInfosRequest: TDeveloperInfosRequest): Promise<TDeveloperInfos> => {
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

  const queryStringUpdateDevInfo: string = `
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


///// const queryStringUpdateDevInfo: string = 
///// `
/////   //! UPDATE
/////   //!   "developerInfos"
/////   //! SET
/////   //!   "developerId" = $1
/////   //! WHERE
/////   //!   id = $2
///// `
///// const queryConfigUpdateDev: QueryConfig = {
/////   text: queryStringUpdateDevInfo,
/////   values: [developerId, queryResultSelectDev.rows[0].id]
///// }
///// await client.query(queryConfigUpdateDev)
///
///// const queryInsertDevInfos: string = format(
/////   `
/////     !INSERT INTO 
/////     !  "developerInfos" ("developerSince", "preferredOS", "developerId")
/////     !VALUES 
/////     !  (%L, %L, %L)
/////     !RETURNING *; 
/////   `,
/////   developerInfosRequest.developerSince,
/////   developerInfosRequest.preferredOS,
/////   queryResultSelectDev.rows[0].id
///// );
///// const queryResultInsertDevInfos: QueryResult = await client.query(queryInsertDevInfos)
///
///// return queryResultInsertDevInfos.rows[0]




