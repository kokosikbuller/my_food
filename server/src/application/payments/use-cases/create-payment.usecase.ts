import { orderItemsRepository } from "../../../domain/repositories/order-items.repository";
import { orderRepository } from "../../../domain/repositories/order.repository";

class CreatePaymentUseCase {
  async execute(orderId: string) {

    const [order] = await orderRepository.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (order.status !== "pending") {
      throw new Error("Order already paid");
    }

    const items = await orderItemsRepository.findByOrderId(orderId);

    const payload = {
      amount: order.totalPrice,
      ccy: 980,

      merchantPaymInfo: {
        reference: order.id,
        destination: "Оплата заказа",
        comment: `Order #${order.id}`,

        basketOrder: items.map(item => ({
          name: item.title,
          qty: item.quantity,
          sum: item.price * item.quantity,
          total: item.price * item.quantity,
          unit: "шт.",
          code: item.productId,
          tax: [],
          discounts: [],
        }))
      },

      redirectUrl: "https://myapp.com/payment/result",
      successUrl: "https://myapp.com/payment/success",
      failUrl: "https://myapp.com/payment/fail",

      webHookUrl: "https://e6b5-213-110-96-133.ngrok-free.app/payments/webhook",

      validity: 3600,
    };

    return payload;
  }
}

export const createPaymentUseCase = new CreatePaymentUseCase();