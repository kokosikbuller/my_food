import {
  pgTable,
  uuid,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { productsSchema } from "./products";
import { basketsSchema } from "./basket";

export const basketItemsSchema = pgTable("basket_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  basketId: uuid("basket_id")
    .notNull()
    .references(() => basketsSchema.id, { onDelete: "cascade" }),

  productId: uuid("product_id")
    .notNull()
    .references(() => productsSchema.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull().default(1),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});