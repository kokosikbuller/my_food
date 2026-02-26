import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { DBType } from "../infrastructure/db/client";
import { createProductsModule } from "../modules/products.module";
import { createUsersModule } from "../modules/users.module";
import { createBasketModule } from "../modules/basket.module";
import { createOrdersModule } from "../modules/orders.module";
import { createPaymentModule } from "../modules/payment.module";

export const createApp = (db: DBType) => {
  return new Elysia()
    .state("db", db)
    .use(createProductsModule(db))
    .use(createUsersModule(db))
    .use(createBasketModule(db))
    .use(createOrdersModule(db))
    .use(createPaymentModule(db))
    .use(jwt({ name: "jwt", secret: "secret_1234" }))
};