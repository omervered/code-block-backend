import { loggerService } from "../../services/logger.service.js";
import { codeBlockService } from "./codeBlocks.service.js";

export async function getCodeBlockById(req, res) {
  try {
    const codeBlockId = req.params.id;
    const codeBlock = await codeBlockService.getById(codeBlockId);
    console.log("codeBlock:", codeBlock);
    res.json(codeBlock);
  } catch (err) {
    loggerService.error("Failed to get codeBlock", err);
    res.status(500).send({ err: "Failed to get codeBlock" });
  }
}
