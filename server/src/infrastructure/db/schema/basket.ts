import {
  pgTable,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersSchema } from "./users";

export const basketsSchema = pgTable("baskets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});