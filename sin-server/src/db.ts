import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

export const createDrizzleClient = (env: any) => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL, // Access env variable inside route
    ssl: true,
  });
  return drizzle(pool);
};
