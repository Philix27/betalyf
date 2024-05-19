import { publicProcedure, router } from "../init"
import { exchangeRouter } from "./exchange"
import { ordersRouter } from "./orders"
import { userRouter } from "./user"

export const appRouter = router({
  user: userRouter,
  exchange: exchangeRouter,
  orders: ordersRouter,
  test_all: publicProcedure.query(({ ctx }) => {
    return "Hello, are you for testing"
  }),
})

export type AppRouter = typeof appRouter
