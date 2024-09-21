import { index, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }),
    image: text("image"),
    phone: varchar("phone", { length: 255 }),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);
