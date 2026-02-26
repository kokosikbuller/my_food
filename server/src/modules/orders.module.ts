import { OrderController } from "../api/controllers/order.contoller";
import { createOrdersRoutes } from "../api/routes/order.routes";
import { CreateOrderUseCase } from "../application/orders/use-cases/create-order.usecase";
import { CreatePaymentUseCase } from "../application/payments/use-cases/create-payment.usecase";
import { BasketItemsRepository } from "../domain/repositories/basket-items.repository";
import { BasketRepository } from "../domain/repositories/basket.repository";
import { OrderItemsRepository } from "../domain/repositories/order-items.repository";
import { OrderRepository } from "../domain/repositories/order.repository";
import { ProductRepository } from "../domain/repositories/product.repository";
import { DBType } from "../infrastructure/db/client";

export const createOrdersModule = (db: DBType) => {
    const orderRepository = new OrderRepository(db);
    const orderItemsRepository = new OrderItemsRepository(db);
    const basketRepository = new BasketRepository(db);
    const basketItemsRepository = new BasketItemsRepository(db);
    const productRepository = new ProductRepository(db);

    const createOrderUseCase = new CreateOrderUseCase(basketRepository, basketItemsRepository, productRepository, orderRepository, orderItemsRepository);
    const createPaymentUseCase = new CreatePaymentUseCase(orderRepository, orderItemsRepository);

    const orderController = new OrderController(createOrderUseCase, createPaymentUseCase);

    return createOrdersRoutes(orderController);
}