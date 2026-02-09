import {
  pgTable,
  uuid,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { usersSchema } from "./users";


export const ordersSchema = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => usersSchema.id)
    .notNull(),

  status: varchar("status", { length: 30 })
    .default("pending") // pending | paid | done | canceled
    .notNull(),

  totalPrice: integer("total_price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});