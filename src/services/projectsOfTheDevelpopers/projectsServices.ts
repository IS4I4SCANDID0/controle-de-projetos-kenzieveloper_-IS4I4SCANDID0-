import format from "pg-format";
import { TGetProjectByIdRenamed, TProject, TProjectRequest } from "../../interfaces/projects.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database/database";

const createProjectServices = async (projectData: TProjectRequest): Promise<TProject> => {
  const values: (string | number | Date)[] = Object.values(projectData);
  const keys: (string | number | Date)[] = Object.keys(projectData);

  const formatString: (string | number | Date) = format(
    `
      INSERT INTO 
        projects (%I)
      VALUES
        (%L)
      RETURNING *;
    `,
    keys,
    values
  );
  const queryResult : QueryResult = await client.query(formatString);

  return queryResult.rows[0];
};

const retrieveProjects = async (projectId: number): Promise<TGetProjectByIdRenamed> => {
  // const projecId = reque

  const queryResult: QueryResult<TGetProjectByIdRenamed> = await client.query(
    `
      SELECT
        p."id" as "projectId",
        p."name" as "projectName",
        p."description" as "projectDescription",
        p."repository" as "projectRepository", 
        p."startDate" as "projectStartDate",
        p."endDate" as "projectEndDate"
      FROM 
        projects p
      LEFT JOIN
        developers de ON p."developerId" = de."id"
      WHERE
        p."id" = $1;
    `,
    [projectId]
  );
  const projectProfile: TGetProjectByIdRenamed = queryResult.rows[0];
  return projectProfile;
}


// "id" SERIAL PRIMARY KEY,
// 	"name" VARCHAR(50) NOT NULL,
// 	"description" TEXT,
// 	"repository" VARCHAR(120) NOT NULL,
// 	"startDate" DATE NOT NULL,
// 	"endDate" DATE,
// {
//   "projectId": 1,
//   "projectName": "Projeto 1",
//   "projectDescription": "Projeto fullstack",
//   "projectRepository": "url.com.br",
//   "projectStartDate": "2023-12-02T03:00:00.000Z",
//   "projectEndDate": null,
//   "projectDeveloperName": "Ugo Roveda"
// }

export default { createProjectServices, retrieveProjects }