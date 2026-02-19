
import { createOrderUseCase } from "../../application/orders/use-cases/create-order.usecase";
import { createPaymentUseCase } from "../../application/payments/use-cases/create-payment.usecase";
import { monoClient } from "../../infrastructure/payments/mono.client";

class OrderController {
  async craete(userId: string) {
    const { order } = await createOrderUseCase.execute(userId);

    const paymentPayload = await createPaymentUseCase.execute(order.id);

    if (!paymentPayload) {
      throw new Error('Error payload');
    }

    const monoData = await monoClient.createInvoice(paymentPayload);

    return { order, monoData };
  }
};

export default new OrderController();