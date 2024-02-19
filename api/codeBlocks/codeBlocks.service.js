import { dbService } from "../../services/db.service.js";

async function getById(codeBlockId) {
  const collection = await dbService.getCollection("codeBlocks");
  try {
    const codeBlock = await collection.findOne({ codeBlockId });
    return codeBlock;
  } catch (err) {
    console.error(`ERROR: cannot find codeBlock ${codeBlockId}`);
    throw err;
  }
}

export const codeBlockService = {
  getById,
};
