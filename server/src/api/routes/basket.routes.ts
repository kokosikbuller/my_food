import { Elysia } from "elysia";
import { BasketController } from "../controllers/basket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const createBasketRouts = (
  basketController: BasketController
) => new Elysia({ prefix: "/basket" })
  .get("/", async ({ userId }) => {
    console.log('userId', userId);
    return await basketController.getBasketProducts(userId);
  }, {
    beforeHandle: authMiddleware,
  })
  .post('/create', async ({userId, request}) => {
    const body = await request.body.json();    
    return await basketController.addProduct(userId, body.productId);
  }, {
    beforeHandle: authMiddleware,
  })
