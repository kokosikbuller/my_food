
import { UpdateStatusUseCase } from "../../application/orders/use-cases/update-status.usecase";

export class PaymentController {
  constructor(private updateStatusUseCase: UpdateStatusUseCase) {}

  async updateOrderStatus(orderId: string) {
    await this.updateStatusUseCase.execute(orderId, 'paid');
  }
};
