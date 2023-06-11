import format from "pg-format";
import { TDeveloper, TDeveloperRequest, TGetDeveloperById, TGetDeveloperByIdRenamed } from "../../interfaces/developers.interfaces";
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
  // console.log(queryResult.rows[0])
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
  

const erasesDevelopers = async (developerId: string): Promise<void> => {
  await client.query(`DELETE FROM developers WHERE "id"= $1;`, [developerId]);
};

export default { createDevelopersService, retrieveDevelopers, erasesDevelopers };

  
 
