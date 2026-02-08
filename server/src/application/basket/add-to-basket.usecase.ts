import basketItemsRepository from "../../domain/repositories/basket-items.repository";
import basketRepository from "../../domain/repositories/basket.repository";

class AddToBasketUseCase {
  async execute(userId: string, productId: string) {
    const basket = await basketRepository.getByUserId(userId);

    const item = await basketItemsRepository.getItem(
      basket.id,
      productId
    );

    console.log('item', item);
    
    if (item) {
      return basketItemsRepository.updateQuantity(
        item.id,
        item.quantity + 1
      );
    }

    return basketItemsRepository.create(basket.id, productId, 1);
  }
}

export default new AddToBasketUseCase();
