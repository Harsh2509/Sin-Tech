import { Hono, Context, Next } from "hono";
import { createDrizzleClient } from "./db";
import { users } from "../db/schema";

const app = new Hono();

app.use("*", async (c: Context, next: Next) => {
  if (!c.get("db")) {
    const drizzleClient = await createDrizzleClient(c.env);
    c.set("db", drizzleClient);
  }
  await next();
});

app.get("/", async (c: Context) => {
  const db = c.get("db");
  const userz = await db.select().from(users);
  return c.json(userz);
});

export default app;
