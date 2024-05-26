import { z } from "zod"

export type IBudgetCategories =
  | "Doc"
  | "Work"
  | "Personal"
  | "Tech"
  | "Spiritual"

export const formSchema = z.object({
  // To
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  allergies: z.string(),
  department: z.string(),
  age: z.string()
})

export const defaultValues: z.infer<typeof formSchema> = {
  email: "",
  firstName: "",
  lastName: "",
  allergies: "",
  department: "",
  age: "",
}

export type IFormSchema = z.infer<typeof formSchema>