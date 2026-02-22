import { Elysia } from "elysia";
import { PaymentController } from "../controllers/payment.controller";

export const createPaymentRoutes = (
  paymentController: PaymentController
) => new Elysia({ prefix: "/payments" })
  .post('/webhook', async (req: any) => {    
    if(req.body.status === 'success') {
      await paymentController.updateOrderStatus(req.body.reference);
    }

    return;
  })