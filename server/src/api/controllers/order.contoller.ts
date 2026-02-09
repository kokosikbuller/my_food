
import { createOrderUseCase } from "../../application/orders/use-cases/create-order.usecase";

class OrderController {
  async craete(userId: string) {
    return createOrderUseCase.execute(userId);
  }
};

export default new OrderController();