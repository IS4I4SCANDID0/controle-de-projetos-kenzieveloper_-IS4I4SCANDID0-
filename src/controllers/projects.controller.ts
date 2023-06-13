import { Request, Response } from "express";
import { TGetProjectById, TGetProjectByIdRenamed, TProject, TProjectRequest } from "../interfaces/projects.interfaces";
import projectsServices from "../services/projectsOfTheDevelpopers/projectsServices";
import { TGetDeveloperByIdRenamed } from "../interfaces/developers.interfaces";

const createProjectController = async (request: Request, response: Response): Promise<Response> => {
  const projectData: TProjectRequest = request.body;
  const newProject: TProject = await projectsServices.createProjectServices(projectData)

  return response.status(201).json(newProject)
}

const retrieveProjectController = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params

  const project: TGetProjectByIdRenamed = await projectsServices.retrieveProjects(parseInt(id));
  return response.status(200).json(project)
}

const updateProjectController = async (request: Request, response: Response): Promise<Response> => {
  const project: TProject = await projectsServices.updateProjects(request.body, parseInt(request.params.id));
  return response.status(200).json(project) 
}

export {
  createProjectController,
  retrieveProjectController,
  updateProjectController
}