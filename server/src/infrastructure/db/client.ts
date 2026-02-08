import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { usersSchema } from "./schema/users";
import { productsSchema } from "./schema/products";

const client = postgres({
  host: "localhost",
  port: 5432,
  database: "my_food",
  user: "postgres",
  password: "postgres",
});

export const db = drizzle(client, { schema: { 
  users: usersSchema, 
  products: productsSchema 
}});