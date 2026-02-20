import {
  pgTable,
  uuid,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categoriesSchema = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("title", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});