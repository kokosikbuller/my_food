import { OrderRepository } from "../../../domain/repositories/order.repository";
import { OrderStatus } from "../../../types";

export class UpdateStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string, status: OrderStatus) {
    await this.orderRepository.updateStatus(orderId, status);
  }
}
