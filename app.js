import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { loggerService } from "./services/logger.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Express App Config
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
  console.log("__dirname: ", __dirname);
} else {
  // Cors Config
  const corsOptions = {
    // Making sure origin contains the url your frontend is running on
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

import { codeBlocksRoutes } from "./api/codeBlocks/codeBlocks.routes.js";

//routes
app.use("/api/codeBlocks", codeBlocksRoutes);
// app.use("/api/auth", authRoutes); if will have time to implement

// Make every unmatched server-side-route fall back to index.html
app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

//Server Activation
const port = process.env.PORT || 3000;

app.listen(port, () => {
  loggerService.info(`server listening on port ${port}`);
});
