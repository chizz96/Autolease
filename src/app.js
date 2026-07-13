import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);


app.use(errorHandler);


export default app;