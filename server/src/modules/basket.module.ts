import Elysia from "elysia";
import { DBType } from "../infrastructure/db/client";
import { createBasketRouts } from "../api/routes/basket.routes";
import { BasketRepository } from "../domain/repositories/basket.repository";
import { BasketItemsRepository } from "../domain/repositories/basket-items.repository";
import { AddToBasketUseCase } from "../application/basket/add-to-basket.usecase";
import { GetBasketProductsUseCase } from "../application/basket/get-basket-products";
import { GetOrCreateBasketUseCase } from "../application/basket/get-or-create-basket.usecase";
import { BasketController } from "../api/controllers/basket.controller";

export const createBasketModule = (db: DBType) => {
  const basketRepository = new BasketRepository(db);
  const basketItemsRepository = new BasketItemsRepository(db);
  const addToBasketUseCase = new AddToBasketUseCase(basketRepository, basketItemsRepository);
  const getBasketProductsUseCase = new GetBasketProductsUseCase(basketRepository, basketItemsRepository);
  const getOrCreateBasketUseCase = new GetOrCreateBasketUseCase(basketRepository);

  const basketController = new BasketController(getOrCreateBasketUseCase, getBasketProductsUseCase, addToBasketUseCase);

  return new Elysia()
    .use(createBasketRouts(basketController));
};
