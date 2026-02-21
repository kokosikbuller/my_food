import { orderRepository } from "../../../domain/repositories/order.repository";
import { OrderStatus } from "../../../types";

class UpdateStatusUseCase {
  async execute(orderId: string, status: OrderStatus) {
    await orderRepository.updateStatus(orderId, status);
  }
}

export const updateStatusUseCase = new UpdateStatusUseCase();