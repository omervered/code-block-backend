import express from "express";
import http from "http";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";
import { loggerService } from "./services/logger.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

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
import { setupSocketAPI } from "./services/socket.service.js";

//routes
app.use("/api/code-blocks", codeBlocksRoutes);
setupSocketAPI(server);

// Make every unmatched server-side-route fall back to index.html
app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

//Server Activation
const port = process.env.PORT || 3000;

server.listen(port, () => {
  loggerService.info(`server listening on port ${port}`);
});
