import { Router } from "express";
import { createDevelopersController } from "../controllers/developers.controller";

const developersRoutes: Router = Router()

developersRoutes.post("", createDevelopersController)
developersRoutes.post("/:id/infos",)

export default developersRoutes