import { z } from "zod"

export const formSchema = z.object({
  drEmail: z.string(),
  amount: z.string(),
})

export const defaultValues: z.infer<typeof formSchema> = {
  drEmail: "",
  amount: "",
}

export type IFormSchema = z.infer<typeof formSchema>
