import { OrderItemsRepository } from "../../../domain/repositories/order-items.repository";
import { OrderRepository } from "../../../domain/repositories/order.repository";

export class CreatePaymentUseCase {
  constructor(private orderRepository: OrderRepository, private orderItemsRepository: OrderItemsRepository) {}

  async execute(orderId: string) {

    const [order] = await this.orderRepository.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (order.status !== "pending") {
      throw new Error("Order already paid");
    }

    const items = await this.orderItemsRepository.findByOrderId(orderId);

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

      webHookUrl: "https://2a82-213-110-96-133.ngrok-free.app/payments/webhook",

      validity: 3600,
    };

    return payload;
  }
}
