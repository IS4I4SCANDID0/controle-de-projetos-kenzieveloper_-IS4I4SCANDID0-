import "express-async-errors"
import "dotenv/config";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import developersRoutes from "./routes/developers.routes";

const app: Application = express();
app.use(express.json())

app.use("/developers", developersRoutes)

app.use(handleErrors);
// ÚLTIMA IMPORTAÇÃO SEMPRE
export default app;
