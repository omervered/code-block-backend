import { dbService } from "../../services/db.service.js";
import { loggerService } from "../../services/logger.service.js";

async function getById(codeBlockId) {
  const collection = await dbService.getCollection("codeBlock");
  console.log("collection:", collection);

  try {
    const codeBlock = await collection.findOne({ codeBlockId: 1 });
    loggerService.info(`Got codeBlock ${codeBlockId}`);
    return codeBlock;
  } catch (err) {
    console.error(`ERROR: cannot find codeBlock ${codeBlockId}`);
    loggerService.error("Failed to get codeBlock", err);
    throw err;
  }
}

export const codeBlockService = {
  getById,
};
