import { Elysia } from "elysia";
import { authMiddleware } from "../middlewares/auth.middleware";
import orderContoller from "../controllers/order.contoller";
import { db } from "../../infrastructure/db/client";
import { ordersSchema } from "../../infrastructure/db/schema/orders";
import { createPaymentUseCase } from "../../application/payments/use-cases/create-payment.usecase";
import { monoClient } from "../../infrastructure/payments/mono.client";

export const ordersRoutes = new Elysia({ prefix: "/orders" })
  //NOTE: Remove test route
  .get("/", async () => {
    const order =  await db.select().from(ordersSchema);

    if(!order) {
      return { message: 'Error' };
    }

    return {order}
  })
  .post('/create', async ({userId}) => {
    return await orderContoller.craete(userId);
  }, {
    beforeHandle: authMiddleware,
  })