import { Request, Response } from "express";
import { TDeveloper, TDeveloperInfos, TDeveloperInfosRequest, TDeveloperRequest } from "../interfaces/developers.interfaces";
import { createDevelopersService } from "../services/developers/createDevelopers.service";
import { createDeveloperInfosService } from "../services/developerInfos/createDeveloperInfos";

const createDevelopersController = async (request: Request, response: Response): Promise<Response> => {
  const developerData: TDeveloperRequest = request.body;
  const newDeveloper: TDeveloper = await createDevelopersService(developerData)
  
  return response.status(201).json(newDeveloper)
}

const createDeveloperInfoController = async (request: Request, response: Response): Promise<Response> => {
  const developerId: number = parseInt(request.params.id);
  const developerInfoData: TDeveloperInfosRequest = request.body
  
  const newDeveloperInfos: TDeveloperInfos = await createDeveloperInfosService(
    developerId,
    developerInfoData
  )
  return response 
  //***CONTINUAR NA DEMO 2 SPRINT 3 A PARTIR DE 1H E 13MIN
}

export { createDevelopersController }