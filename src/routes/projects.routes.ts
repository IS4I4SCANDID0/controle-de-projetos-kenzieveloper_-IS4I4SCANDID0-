import { Router } from "express";
import { verifyDevIdParams } from "../middlewares/verifyDevIdParams.middlewares";
import { createProjectController, retrieveProjectController } from "../controllers/projects.controller";
import { verifyIdProject } from "../middlewares/verifyIdProject.middleware";
import { updateDeveloperController } from "../controllers/developers.controller";

const projectsRoutes: Router = Router();

projectsRoutes.post("", verifyDevIdParams, createProjectController)
projectsRoutes.get("/:id", verifyIdProject, retrieveProjectController)
projectsRoutes.patch("/:id", verifyIdProject, updateDeveloperController)

export default projectsRoutes