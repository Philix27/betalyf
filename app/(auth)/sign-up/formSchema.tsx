import { z } from "zod"

export type IBudgetCategories =
  | "Home"
  | "Work"
  | "Personal"
  | "Tech"
  | "Spiritual"

export const formSchema = z.object({
  // To
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  allergies: z.string(),
  department: z.string(),
  age: z.number(),
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: "",
  email: "",
  firstName: "",
  lastName: "",
  allergies: "",
  department: "",
  age: 0,
}

export type IFormSchema = z.infer<typeof formSchema>
