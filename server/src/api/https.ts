import { Elysia } from "elysia";
import { routes } from "./routes";
import jwt from "@elysiajs/jwt";
import { createProductsModule } from "../modules/products.module";
import { DBType } from "../infrastructure/db/client";
import { createUsersModule } from "../modules/users.module";
import { createBasketModule } from "../modules/basket.module";

export const createApp = (db: DBType) => {
  return new Elysia()
    .state("db", db)
    .use(createProductsModule(db))
    .use(createUsersModule(db))
    .use(createBasketModule(db))
    .use(jwt({ name: "jwt", secret: "secret_1234" }))
    .use(routes);
};