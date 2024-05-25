import { publicProcedure, router } from "@/server"
import { $Enums } from "@prisma/client"
import { z } from "zod"

export const clinicianRouter = router({
  getInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.clinician.findFirst({
        where: {
          id: input.id,
        },
      })
    }),

  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        walletAddress: z.string(),
        country: z.string().optional(),
        department: z.nativeEnum($Enums.DEPARTMENT),
        isMale: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.clinician.create({
        data: {
          email: input.email,
          lastname: input.lastName,
          wallet_address: input.walletAddress,
          firstname: input.firstName,
          department: input.department,
          isMale: input.isMale,
        },
      })
    }),
})
