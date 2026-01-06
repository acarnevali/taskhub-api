import express from "express";

import { routes } from "../src/modules/shared/infra/http/routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js"; 

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});