import Elysia from "elysia";
import { DBType } from "../infrastructure/db/client";
import { createPaymentRoutes } from "../api/routes/payment.routes";
import { PaymentController } from "../api/controllers/payment.controller";
import { OrderRepository } from "../domain/repositories/order.repository";
import { UpdateStatusUseCase } from "../application/orders/use-cases/update-status.usecase";

export const createPaymentModule = (db: DBType) => {
  const orderRepository = new OrderRepository(db);
  const updateStatusUseCase = new UpdateStatusUseCase(orderRepository);  
  const paymentController = new PaymentController(updateStatusUseCase);

  return new Elysia()
    .use(createPaymentRoutes(paymentController));
};
