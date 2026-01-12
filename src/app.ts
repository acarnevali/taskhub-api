import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { routes } from "./modules/shared/infra/http/routes/index.js"; 
import { errorMiddleware } from "./middlewares/errorMiddleware.js"; 
import { swaggerOptions } from "./config/swagger.js"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use(routes);

app.use(errorMiddleware);

export { app };