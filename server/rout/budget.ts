import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const budgetRouter = router({
  get_all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.budget.findMany()
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.budget.delete({
        where: {
          id: input.id,
        },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.budget.create({
        data: {
          title: input.title,
          desc: input.description,
          category: input.category,
        },
      })
    }),
})
