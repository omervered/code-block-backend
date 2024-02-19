import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { loggerService } from "./services/logger.service.js";

const app = express();

// Express App Config
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
  console.log("__dirname: ", __dirname);
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

import { codeBlocksRoutes } from "./api/codeBlocks/codeBlocks.routes.js";

//routes
app.use("/api/codeBlocks", codeBlocksRoutes);
// app.use("/api/auth", authRoutes); if will have time to implement

app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

//Server Activation
const port = process.env.PORT || 3000;

app.listen(port, () => {
  loggerService.info(`server listening on port ${port}`);
});
