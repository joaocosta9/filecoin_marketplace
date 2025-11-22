import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  address: varchar("address").notNull().primaryKey(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey(),
  cid: text("cid").notNull(),
  address: varchar("address")
    .notNull()
    .references(() => users.address),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
}));
