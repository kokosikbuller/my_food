import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { ordersSchema } from "./orders";
import { productsSchema } from "./products";

export const orderItemsSchema = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  orderId: uuid("order_id")
    .references(() => ordersSchema.id, { onDelete: "cascade" })
    .notNull(),

  productId: uuid("product_id")
    .references(() => productsSchema.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(), // copy

  price: integer("price").notNull(), //price on moment ordering

  quantity: integer("quantity").notNull(),
});