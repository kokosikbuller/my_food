import { Elysia } from "elysia";
import { routes } from "./routes";
import jwt from "@elysiajs/jwt";
import { createProductsModule } from "../modules/products.module";
import { DBType } from "../infrastructure/db/client";

export const createApp = (db: DBType) => {
  return new Elysia()
    .state("db", db)
    .use(createProductsModule(db))
    .use(jwt({ name: "jwt", secret: "secret_1234" }))
    .use(routes);
};