import basketItemsRepository from "../../../domain/repositories/basket-items.repository";
import basketRepository from "../../../domain/repositories/basket.repository";
import { orderItemsRepository } from "../../../domain/repositories/order-items.repository";
import { orderRepository } from "../../../domain/repositories/order.repository";
import productRepository from "../../../domain/repositories/product.repository";
import { db } from "../../../infrastructure/db/client";

class CreateOrderUseCase {
  async execute(userId: string) {
    return db.transaction(async (tx) => {

      const basket = await basketRepository.getByUserId(userId);

      if (!basket) throw new Error("Basket not found");

      const items = await basketItemsRepository.getItemsByBasketId(
        basket.id
      );

      if (!items.length) throw new Error("Basket is empty");

      const products = await productRepository.getByIds(
        items.map(i => i.product.id)
      );

      let total = 0;

      const orderItems = items.map(item => {
        const product = products.find(p => p.id === item.product.id)!;

        total += product.price * item.quantity;

        return {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      });

      const [order] = await orderRepository.create(
        {
          userId,
          totalPrice: total,
          status: "pending",
        },
        tx
      );

      await orderItemsRepository.createMany(
        orderItems.map(i => ({
          ...i,
          orderId: order.id,
        })),
        tx
      );

      await basketItemsRepository.clear(basket.id, tx);

      return order;
    });
  }
}

export const createOrderUseCase = new CreateOrderUseCase();