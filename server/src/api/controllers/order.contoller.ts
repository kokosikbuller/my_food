
import { CreateOrderUseCase } from "../../application/orders/use-cases/create-order.usecase";
import { CreatePaymentUseCase } from "../../application/payments/use-cases/create-payment.usecase";
import { monoClient } from "../../infrastructure/payments/mono.client";

export class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase, private createPaymentUseCase: CreatePaymentUseCase) {}

  async craete(userId: string) {
    const { order } = await this.createOrderUseCase.execute(userId);

    const paymentPayload = await this.createPaymentUseCase.execute(order.id);

    if (!paymentPayload) {
      throw new Error('Error payload');
    }

    const monoData = await monoClient.createInvoice(paymentPayload);

    return { order, monoData };
  }
};
