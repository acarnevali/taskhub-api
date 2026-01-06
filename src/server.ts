import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { routes } from "./modules/shared/infra/http/routes/index.js"; 
import { errorMiddleware } from "./middlewares/errorMiddleware.js"; 
import { swaggerOptions } from "./config/swagger.js"; 

const app = express();

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(routes);

app.use(errorMiddleware);

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📖 Documentation at http://localhost:${port}/api-docs`);
});