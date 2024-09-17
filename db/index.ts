import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema";

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(
  process.env.DATABASE_URL || "postgresql://postgres:postgres:5432",
  { prepare: false }
);
export const db = drizzle(client);