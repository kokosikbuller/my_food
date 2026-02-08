import addToBasketUsecase from "../../application/basket/add-to-basket.usecase";
import getBasketProducts from "../../application/basket/get-basket-products";
import getOrCreateBasketUsecase from "../../application/basket/get-or-create-basket.usecase";

class BasketController {
  async getBasketByUserId(userId: string) {
    return getOrCreateBasketUsecase.execute(userId);
  }

  async getBasketProducts(userId: string) {
    return getBasketProducts.execute(userId);
  }


  async addProduct(userId: string, productId: string) {
    return addToBasketUsecase.execute(userId, productId);
  }
};

export default new BasketController();