import express from "express";
import cors from "cors";
import { connectToDB } from "../config/MongoDB";
import {} from "../routers/TaskRoute";
import { router as TaskRoute } from "../routers/TaskRoute";

const app = express();
const PORT = 8080;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
connectToDB();
app.use(TaskRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
