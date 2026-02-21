import { BasketItemsRepository } from "../../domain/repositories/basket-items.repository";
import { BasketRepository } from "../../domain/repositories/basket.repository";

export class AddToBasketUseCase {
  constructor(private basketRepository: BasketRepository, private basketItemsRepository: BasketItemsRepository) {}

  async execute(userId: string, productId: string) {
    const basket = await this.basketRepository.getByUserId(userId);

    const item = await this.basketItemsRepository.getItem(
      basket.id,
      productId
    );
    
    if (item) {
      return this.basketItemsRepository.updateQuantity(
        item.id,
        item.quantity + 1
      );
    }

    return this.basketItemsRepository.create(basket.id, productId, 1);
  }
}
