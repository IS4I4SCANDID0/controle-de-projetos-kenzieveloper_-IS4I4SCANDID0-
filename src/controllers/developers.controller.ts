import { Request, Response } from "express";
import { TDeveloper, TDeveloperInfos, TDeveloperInfosRequest, TDeveloperRequest, TGetDeveloperByIdRenamed } from "../interfaces/developers.interfaces";
import developerService from "../services/developers/developerService";
import { createDeveloperInfosService } from "../services/developerInfos/createDeveloperInfos";

const createDevelopersController = async (request: Request, response: Response): Promise<Response> => {
  const developerData: TDeveloperRequest = request.body;
  const newDeveloper: TDeveloper = await developerService.createDevelopersService(developerData)
  
  return response.status(201).json(newDeveloper)
}

const createDeveloperInfoController = async (request: Request, response: Response): Promise<Response> => {
  const developerId: number = parseInt(request.params.id);
  const developerInfoData: TDeveloperInfosRequest = request.body
  
  const newDeveloperInfos: TDeveloperInfos = await createDeveloperInfosService(
    developerId,
    developerInfoData
  )
  return response.status(201).json(newDeveloperInfos) 
  //***CONTINUAR NA DEMO 2 SPRINT 3 A PARTIR DE 1H E 13MIN
}


const retrieveDevelopersController = async (request: Request, response: Response): Promise<Response> => {
  const developer: TGetDeveloperByIdRenamed  | null = await developerService.retrieveDevelopers(request.params.id);
  return response.status(200).json(developer)
} 


const erasesDevelopersController = async (request: Request, response: Response): Promise<Response> => {
  await developerService.erasesDevelopers(request.params.id);
  return response.status(204).send()
} 

export { createDevelopersController, createDeveloperInfoController, retrieveDevelopersController, erasesDevelopersController }