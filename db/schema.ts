import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";

// Define the 'users' table for SQLite
export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }), // SQLite uses integer with autoIncrement for primary keys
    email: text("email", { length: 255 }).unique().notNull(),
    name: text("name", { length: 255 }),
    image: text("image"),
    phone: text("phone", { length: 255 }),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email), // Define unique index on 'email'
  })
);

// Define the 'carts' table for SQLite
export const carts = sqliteTable(
  "carts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }), // SQLite uses integer with autoIncrement for primary keys
    userId: integer("user_id")
      .notNull()
      .references(() => users.id), // Reference the 'users' table
    productId: integer("product_id").notNull(),
    quantity: integer("quantity").default(1),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId), // Define index on 'user_id'
    productIdIdx: index("product_id_idx").on(table.productId), // Define index on 'product_id'
  })
);

// Define relations between 'carts' and 'users'
export const cartsRelation = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId], // Define the foreign key relationship
    references: [users.id],
  }),
}));

// Define relations between 'users' and 'carts'
export const usersRelations = relations(users, ({ many }) => ({
  carts: many(carts),
}));
