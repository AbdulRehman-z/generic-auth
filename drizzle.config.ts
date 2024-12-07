import { env } from "./src/schemas/env-schema";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/mirgrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
