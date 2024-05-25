import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const userRouter = router({
  get_all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
