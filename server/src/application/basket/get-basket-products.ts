import basketItemsRepository from "../../domain/repositories/basket-items.repository";
import basketRepository from "../../domain/repositories/basket.repository";

class GetBasketProductsUseCase {
  async execute(userId: string) {
    const basket = await basketRepository.getByUserId(userId);

    return basketItemsRepository.getItemsByBasketId(basket.id);
  }
}

export default new GetBasketProductsUseCase();
