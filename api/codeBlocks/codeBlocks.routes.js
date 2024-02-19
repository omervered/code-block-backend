import express from "express";

import { getCodeBlockById } from "./codeBlocks.controller";

export const codeBlocksRoutes = express.Router();

codeBlocksRoutes.get("/:id", getCodeBlockById);
