import { app } from "./app.js";

const port = 3333;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📖 Documentation at http://localhost:${port}/api-docs`);
});