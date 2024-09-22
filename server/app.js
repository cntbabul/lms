import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    Credentials: true,
  })
);

//routes
app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Page not found",
    message: `Route ${req.url} does not exist`,
  });
});

export default app;
