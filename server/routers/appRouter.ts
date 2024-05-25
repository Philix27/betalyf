import { publicProcedure, router } from "../init"
import { appointmentRouter } from "./appointment"
import { clinicianRouter } from "./clinician"
import { ordersRouter } from "./orders"
import { userRouter } from "./user"

export const appRouter = router({
  user: userRouter,
  clinician: clinicianRouter,
  orders: ordersRouter,
  appointment: appointmentRouter,
  test_all: publicProcedure.query(({ ctx }) => {
    return "Hello, are you for testing"
  }),
})

export type AppRouter = typeof appRouter
