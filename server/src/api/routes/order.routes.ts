import { Elysia } from "elysia";
import { authMiddleware } from "../middlewares/auth.middleware";
import orderContoller from "../controllers/order.contoller";
import { db } from "../../infrastructure/db/client";
import { ordersSchema } from "../../infrastructure/db/schema/orders";

export const ordersRoutes = new Elysia({ prefix: "/orders" })
  //NOTE: Remove test route
  .get("/", async () => {
    // return await basketController.getBasketProducts(userId);
    return await db.select().from(ordersSchema)
  })
  .post('/create', async ({userId}) => {
    return await orderContoller.craete(userId);
  }, {
    beforeHandle: authMiddleware,
  })