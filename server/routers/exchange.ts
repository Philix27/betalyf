import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const exchangeRouter = router({
  getAll: publicProcedure.input(z.object({})).query(async ({ ctx, input }) => {
    return await ctx.prisma.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findFirst({
        where: {
          id: input.id,
        },
      })
    }),
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findFirst({
        where: {
          user_id: input.id,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ product_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.delete({
        where: {
          id: input.product_id,
        },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        // Footer
        footerNote: z.string().optional(),
        thanksMsg: z.string().optional(),
        total: z.number(),
        subtotal: z.number(),
        tax: z.number().optional(),
        discount: z.number().optional(),
        // items: z.array(
        //   z.object({
        //     name: z.string(),
        //     quantity: z.number(),
        //     amount: z.number(),
        //   })
        // ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const inv = await ctx.prisma.product.create({
        data: {
          total: input.total,
          subtotal: input.subtotal,
          tax: input.tax,
          discount: input.discount,
          items: {
            createMany: {
              data: [
                {
                  name: "Milk",
                  quantity: 1,
                  amount: 1,
                },
                {
                  name: "Sugar",
                  quantity: 1,
                  amount: 1,
                },
              ],
            },
          },
        },
      })

      return inv.id
    }),
})
