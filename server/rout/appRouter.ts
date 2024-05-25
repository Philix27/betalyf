import { publicProcedure, router } from "../init";
import { budgetRouter } from "./budget";
import { invoiceRouter } from "./invoice";
import { invoiceItemRouter } from "./invoiceItems";


export const appRouter = router({
  invoice: invoiceRouter,
  invoiceItem: invoiceItemRouter,
  budgetRouter: budgetRouter,
  test_all: publicProcedure.query(({ ctx }) => {
    return "Hello, are you for testing"
  }),
})

export type AppRouter = typeof appRouter