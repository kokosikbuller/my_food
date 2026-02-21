import { AddToBasketUseCase } from "../../application/basket/add-to-basket.usecase";
import { GetBasketProductsUseCase } from "../../application/basket/get-basket-products";
import { GetOrCreateBasketUseCase } from "../../application/basket/get-or-create-basket.usecase";

export class BasketController {
  constructor(private getOrCreateBasketUsecase: GetOrCreateBasketUseCase, private getBasketProductsUsecase: GetBasketProductsUseCase, private addToBasketUsecase: AddToBasketUseCase) { }

  async getBasketByUserId(userId: string) {
    return this.getOrCreateBasketUsecase.execute(userId);
  }

  async getBasketProducts(userId: string) {
    return this.getBasketProductsUsecase.execute(userId);
  }

  async addProduct(userId: string, productId: string) {
    return this.addToBasketUsecase.execute(userId, productId);
  }
};
