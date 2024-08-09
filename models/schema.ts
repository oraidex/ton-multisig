import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    // We'll add tableSchemas here later

    tableSchema({
      name: "addresses",
      columns: [
        { name: "type", type: "string" },
        { name: "name", type: "string" },
        { name: "address", type: "string" },
      ],
    }),
  ],
});
