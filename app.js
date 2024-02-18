import express from "express";
import { loggerService } from "./services/logger.service.js";
import { codeBlockService } from "./services/codeBlocks.service.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Express App Config
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

//Express Routing
app.get("/api/codeBlocks/:id", (req, res) => {
  const codeBlockId = req.params.id;
  loggerService.info("Fetching codeBlocks for id: ", codeBlockId);
  try {
    const code = codeBlockService.getCodeBlockById(codeBlockId);
    res.json(code);
  } catch (err) {
    loggerService.error("Failed to fetch codeBlocks", err);
    res.status(500).send("Failed to fetch codeBlocks");
  }
});

//Server Activation
const port = process.env.PORT || 3000;
app.listen(port, () => {
  loggerService.info(`server listening on port ${port}`);
});
