import { z } from "zod"

export const formSchema = z.object({
  drEmail: z.string(),
  amount: z.number(),
})

export const defaultValues: z.infer<typeof formSchema> = {
  drEmail: "",
  amount: 0,
}

export type IFormSchema = z.infer<typeof formSchema>
