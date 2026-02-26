import { BasketRepository } from "../../domain/repositories/basket.repository";

export class GetOrCreateBasketUseCase {
  constructor(private basketRepository: BasketRepository) {}

  async execute(userId: string) {
    const basket = await this.basketRepository.getByUserId(userId);

    if (basket) {
      return basket;
    }

    return this.basketRepository.create(userId);
  }
}
