import { Router } from "express";
import { createDeveloperInfoController, createDevelopersController, erasesDevelopersController, retrieveDevelopersController } from "../controllers/developers.controller";
import { verifyDevIdParams } from "../middlewares/verifyDevIdParams.middlewares";

const developersRoutes: Router = Router()

developersRoutes.post("", createDevelopersController)
developersRoutes.get("/:id", verifyDevIdParams,retrieveDevelopersController);
developersRoutes.delete("/:id", verifyDevIdParams,erasesDevelopersController);

developersRoutes.post("/:id/infos", verifyDevIdParams,createDeveloperInfoController)

export default developersRoutes