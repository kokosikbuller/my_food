import { BasketItemsRepository } from "../../../domain/repositories/basket-items.repository";
import { BasketRepository } from "../../../domain/repositories/basket.repository";
import { OrderItemsRepository } from "../../../domain/repositories/order-items.repository";
import { OrderRepository } from "../../../domain/repositories/order.repository";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import { db } from "../../../infrastructure/db/client";

export class CreateOrderUseCase {
  constructor(
    private basketRepository: BasketRepository,
    private basketItemsRepository: BasketItemsRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private orderItemsRepository: OrderItemsRepository
  ) { }

  async execute(userId: string) {
    return db.transaction(async (tx) => {

      const basket = await this.basketRepository.getByUserId(userId);

      if (!basket) throw new Error("Basket not found");

      const items = await this.basketItemsRepository.getItemsByBasketId(
        basket.id
      );

      if (!items.length) throw new Error("Basket is empty");

      const products = await this.productRepository.getByIds(
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

      const [order] = await this.orderRepository.create(
        {
          userId,
          totalPrice: total,
          status: "pending",
        },
        tx
      );

      await this.orderItemsRepository.createMany(
        orderItems.map(i => ({
          ...i,
          orderId: order.id,
        })),
        tx
      );

      await this.basketItemsRepository.clear(basket.id, tx);

      return { order };
    });
  }
}
