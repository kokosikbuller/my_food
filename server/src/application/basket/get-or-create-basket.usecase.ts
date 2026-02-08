import basketRepository from "../../domain/repositories/basket.repository";

class GetOrCreateBasketUseCase {
  async execute(userId: string) {
    const basket = await basketRepository.getByUserId(userId);

    if (basket) {
      console.log('get');
      return basket;
    }

    console.log('create');

    return basketRepository.create(userId);
  }
}

export default new GetOrCreateBasketUseCase();