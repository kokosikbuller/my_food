import { basketRoutes } from "./basket.routes";
import { ordersRoutes } from "./order.routes";
import { paymentsRoutes } from "./payment.routes";
import { usersRoutes } from "./users.routes";

export const routes = [
  usersRoutes,
  basketRoutes,
  ordersRoutes,
  paymentsRoutes
];