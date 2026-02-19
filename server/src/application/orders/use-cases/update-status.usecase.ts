import basketItemsRepository from "../../../domain/repositories/basket-items.repository";
import basketRepository from "../../../domain/repositories/basket.repository";
import { orderItemsRepository } from "../../../domain/repositories/order-items.repository";
import { orderRepository } from "../../../domain/repositories/order.repository";
import productRepository from "../../../domain/repositories/product.repository";
import { db } from "../../../infrastructure/db/client";
import { monoClient } from "../../../infrastructure/payments/mono.client";
import { OrderStatus } from "../../../types";
import { createPaymentUseCase } from "../../payments/use-cases/create-payment.usecase";

class UpdateStatusUseCase {
  async execute(orderId: string, status: OrderStatus) {
    await orderRepository.updateStatus(orderId, status);
  }
}

export const updateStatusUseCase = new UpdateStatusUseCase();