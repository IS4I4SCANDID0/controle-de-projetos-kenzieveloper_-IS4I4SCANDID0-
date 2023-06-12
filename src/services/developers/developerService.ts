import format from "pg-format";
import { TDeveloper, TDeveloperRequest, TDeveloperUpdate, TGetDeveloperByIdRenamed } from "../../interfaces/developers.interfaces";
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

  const queryResult: QueryResult<TDeveloper> = await client.query(formatString);
  
  return queryResult.rows[0];
};

const retrieveDevelopers = async (developerId: string): Promise<TGetDeveloperByIdRenamed> => {
  const queryResult: QueryResult<TGetDeveloperByIdRenamed> = await client.query(
    `
      SELECT 
        de."id" as "developerId",
        de."name" as "developerName",
        de."email" as "developerEmail",
        di."developerSince" as "developerInfoDeveloperSince",
        di."preferredOS" as "developerInfoPreferredOS"
      FROM 
        developers de
      LEFT JOIN
        "developerInfos" di ON di."developerId" = de."id"
      WHERE
        de."id" = $1;
    `,
    [developerId]
  );
  const developerFullProfile: TGetDeveloperByIdRenamed = queryResult.rows[0];
  
  return developerFullProfile;
};
  
const updateDevelopers = async (developerData: TDeveloperUpdate, developerId: string): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `UPDATE developers SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(developerData),
    Object.values(developerData)
  );
  const queryResult: QueryResult = await client.query(queryFormat, [developerId]) 

  return queryResult.rows[0]
}


const erasesDevelopers = async (developerId: string): Promise<void> => {
  await client.query(`DELETE FROM developers WHERE "id"= $1;`, [developerId]);
};

export default { createDevelopersService, retrieveDevelopers, updateDevelopers,erasesDevelopers };

  
 
