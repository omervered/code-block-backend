import { codeBlockService } from "./codeBlocks.service";

export async function getCodeBlockById(req, res) {
  try {
    const codeBlockId = req.params.id;
    const codeBlock = await codeBlockService.getById(codeBlockId);
    res.json(codeBlock);
  } catch (err) {
    logger.error("Failed to get codeBlock", err);
    res.status(500).send({ err: "Failed to get codeBlock" });
  }
}
