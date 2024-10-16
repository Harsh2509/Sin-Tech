import { type Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  out: "./db/migrations",
} satisfies Config;
