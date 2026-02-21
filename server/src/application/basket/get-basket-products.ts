import { BasketItemsRepository } from "../../domain/repositories/basket-items.repository";
import { BasketRepository } from "../../domain/repositories/basket.repository";

export class GetBasketProductsUseCase {
  constructor(private basketRepository: BasketRepository, private basketItemsRepository: BasketItemsRepository) {}

  async execute(userId: string) {
    const basket = await this.basketRepository.getByUserId(userId);

    return this.basketItemsRepository.getItemsByBasketId(basket.id);
  }
}
