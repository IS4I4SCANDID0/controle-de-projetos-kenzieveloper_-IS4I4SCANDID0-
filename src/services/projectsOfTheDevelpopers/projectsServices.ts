import format from "pg-format";
import { TGetProjectByIdRenamed, TProject, TProjectRequest, TProjectUpdate } from "../../interfaces/projects.interfaces";
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
  const queryResult: QueryResult<TGetProjectByIdRenamed> = await client.query(
    `
      SELECT
        p."id" as "projectId",
        p."name" as "projectName",
        p."description" as "projectDescription",
        p."repository" as "projectRepository", 
        p."startDate" as "projectStartDate",
        p."endDate" as "projectEndDate",
        de."name" as "projectDeveloperName"
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

const updateProjects = async (projectData: TProjectUpdate, projectId: number): Promise<TProject> => {
  
  const queryFormat: string = format(
    `UPDATE projects SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(projectData),
    Object.values(projectData)
  );
  const queryResult: QueryResult = await client.query(queryFormat, [projectId]);
  return queryResult.rows[0];
}

export default { createProjectServices, retrieveProjects, updateProjects }