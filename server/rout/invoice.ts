import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const invoiceRouter = router({
  getAll: publicProcedure.input(z.object({})).query(async ({ ctx, input }) => {
    return await ctx.prisma.invoice.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.findFirst({
        where: {
          id: input.id,
        },
      })
    }),
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.findFirst({
        where: {
          user_id: input.id,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ invoice_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.delete({
        where: {
          id: input.invoice_id,
        },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        ownerWalletAddress: z.string(),
        toBusinessName: z.string(),
        toWebsite: z.string().optional(),
        toAddress: z.string().optional(),
        toEmail: z.string(),
        toPhone: z.string().optional(),
        // From
        fromBusinessName: z.string().optional(),
        fromPhone: z.string().optional(),
        fromEmail: z.string().optional(),
        fromDate: z.string().optional(),
        fromAddress: z.string().optional(),
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
      const inv = await ctx.prisma.invoice.create({
        data: {
          ownerWalletAddress: input.ownerWalletAddress!,
          fromAddress: input.fromAddress!,
          fromBusinessName: input.fromBusinessName!,
          fromDate: input.fromDate!,
          fromEmail: input.fromEmail!,
          fromPhone: input.fromPhone!,
          toBusinessName: input.toBusinessName,
          toEmail: input.toEmail,
          toAddress: input.toAddress,
          toPhone: input.toPhone,
          footerNote: input.footerNote!,
          thanksMsg: input.thanksMsg!,
          toWebsite: input.toWebsite,
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
