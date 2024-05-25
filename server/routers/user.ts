import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      })
    }),

  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        walletAddress: z.string(),
        age: z.number(),
        allergies: z.string(),
        country: z.string().optional(),
        isMale: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.create({
        data: {
          email: input.email,
          lastname: input.lastName,
          wallet_address: input.walletAddress,
          firstname: input.firstName,
          age: input.age,
          allergies: input.allergies,
          country: input.country,
          isMale: input.isMale,
        },
      })
    }),
})
