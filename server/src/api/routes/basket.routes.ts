import { Elysia } from "elysia";
import basketController from "../controllers/basket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const basketRoutes = new Elysia({ prefix: "/basket" })
  .get("/", async ({ userId }) => {
    console.log('userId', userId);
    return await basketController.getBasketProducts(userId);
    // return await basketController.getBasketByUserId(userId);
  }, {
    beforeHandle: authMiddleware,
  })
  .post('/create', async ({userId, request}) => {
    const body = await request.body.json();
    // console.log('1', {userId, productId: body.productId});
    
    return await basketController.addProduct(userId, body.productId);
  }, {
    beforeHandle: authMiddleware,
  })