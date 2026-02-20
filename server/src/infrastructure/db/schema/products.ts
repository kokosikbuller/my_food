import { pgTable, uuid, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { categoriesSchema } from "./categories";

export const productsSchema = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  shortDescription: varchar("short_description", { length: 500 }).notNull(),
  description: text("description"),
  count: integer("count").default(0).notNull(),
  price: integer("price").notNull(),
  image: varchar("image", { length: 500 }),
  categoryId: uuid("category_id")
      .notNull()
      .references(() => categoriesSchema.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
