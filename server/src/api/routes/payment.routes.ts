import { Elysia } from "elysia";
import { updateStatusUseCase } from "../../application/orders/use-cases/update-status.usecase";

let dataLocal = {};

export const paymentsRoutes = new Elysia({ prefix: "/payments" })
  .post('/webhook', async (req: any) => {
    console.log('Webhook', req);

    // dataLocal = req.body;
    if(req.body.status === 'success') {
      await updateStatusUseCase.execute(req.body.reference, 'paid');
    }

    return;
  })
  .get('/test', async () => {
    return dataLocal
  })