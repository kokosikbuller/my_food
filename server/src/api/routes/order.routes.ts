import { Elysia } from "elysia";
import { authMiddleware } from "../middlewares/auth.middleware";
import { OrderController } from "../controllers/order.contoller";
import { db } from "../../infrastructure/db/client";
import { ordersSchema } from "../../infrastructure/db/schema/orders";

export const createOrdersRoutes = (
  orderContoller: OrderController
) => new Elysia({ prefix: '/orders' })
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