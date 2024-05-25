import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const invoiceItemRouter = router({
  get_all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.invoiceItem.findMany()
  }),

  delete: publicProcedure
    .input(z.object({ blog_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.invoiceItem.delete({
        where: {k
          id: input.blog_id,
        },
      })
    }),

  // create: publicProcedure
  //   .input(
  //     z.object({
  //       title: z.string(),
  //       subtitle: z.string(),
  //       img_url: z.string(),
  //       story: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return await ctx.prisma.invoiceItem.create({
  //       data: {
  //         title: input.title,
  //         subtitle: input.subtitle,
  //         img_url: input.img_url,
  //         story: input.story,
  //       },
  //     });
  //   }),
})
