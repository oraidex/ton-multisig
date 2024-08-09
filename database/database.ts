// database.ts
import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "../models/schema"; // Your database schema
import Address from "../models/Address"; // Example model

const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true, // Optional for persistence across sessions
  dbName: "ton-multisig-database", // Optional, default is 'watermelon'
});

const database = new Database({
  adapter,
  modelClasses: [Address],
});

export default database;
