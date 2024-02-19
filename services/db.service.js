// import mongoDB from "mongodb";
// const { MongoClient } = mongoDB;

// import { config } from "../config/index.js";
// import { loggerService } from "./logger.service.js";

// export const dbService = {
//   getCollection,
// };

// var dbConn = null;

// // Get a collection from the DB
// async function getCollection(collectionName) {
//   try {
//     const db = await _connect();
//     const collection = await db.collection(collectionName);
//     return collection;
//   } catch (err) {
//     loggerService.error("Failed to get Mongo collection", err);
//     throw err;
//   }
// }

// // Connect to the DB
// async function _connect() {
//   if (dbConn) return dbConn;
//   try {
//     const client = await MongoClient.connect(config.dbURL);
//     const db = client.db(config.dbName);
//     dbConn = db;
//     return db;
//   } catch (err) {
//     loggerService.error("Cannot Connect to DB", err);
//     throw err;
//   }
// }

import mongoDB from "mongodb";
const { MongoClient, ServerApiVersion } = mongoDB;

import { config } from "../config/index.js";
import { loggerService } from "./logger.service.js";

export const dbService = {
  getCollection,
};

var dbConn = null;

// Get a collection from the DB
async function getCollection(collectionName) {
  try {
    const db = await _connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    loggerService.error("Failed to get Mongo collection", err);
    throw err;
  }
}

// Connect to the DB
async function _connect() {
  if (dbConn) return dbConn;
  try {
    // Create a MongoClient with the desired Server API version
    const client = new MongoClient(config.dbURL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // Connect the client to the server
    await client.connect();
    const db = client.db(config.dbName);
    dbConn = db;
    return db;
  } catch (err) {
    loggerService.error("Cannot Connect to DB", err);
    throw err;
  }
}
