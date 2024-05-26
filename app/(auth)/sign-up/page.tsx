"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { InputText } from "@/(pages)/_comps"
import { AppInput, Button, Form, TextB, TextH } from "@/comps"
import { cn } from "@/lib"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  IBudgetCategories,
  IFormSchema,
  defaultValues,
  formSchema,
} from "./formSchema"
import styles from "./styles.module.css"

export default function SignInPage() {
  const router = useRouter()
  const [category, setCategory] = useState<IBudgetCategories>("Home")
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: IFormSchema) {
    // Todo
    // Call trpc, add to db
    // call smart contract and create
    console.log(values)
  }
  const handleSubmit = () => {}

  return (
    <div
      className={cn(
        `
    w-full h-[calc(100vh-60px)] 
      flex flex-col items-center justify-center
    `,
        styles.container
      )}
    >
      <div
        className={`
        w-[90%] flex flex-col gap-y-4 
        items-center justify-center 
        text-center rounded-2xl 
        p-2
      `}
      >
        <TextH>Register with us ke</TextH>
        <TextB v="p4">Have free access to over 100 physicians</TextB>
        <div
          className={`
      flex flex-col gap-y-4 w-full
        py-6 px-4 rounded-2xl border-primary 
        border-[1px] bg-background
      `}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`
            w-full flex flex-col 
            items-center 
            justify-center 
            my-8
        `}
            >
              <div
                className={
                  "w-[90%] space-y-6 flex flex-col items-center md:w-[75%] "
                }
              >
                <AppInput
                  control={form.control}
                  name="firstName"
                  label="Name of budget"
                />
                <AppInput
                  control={form.control}
                  name="lastName"
                  label="Name of budget"
                />
                <AppInput
                  control={form.control}
                  name="email"
                  label="Name of budget"
                />

                <div className={"w-full"}>
                  <label htmlFor="category">
                    <TextB>Category</TextB>
                  </label>
                </div>
                <select
                  name="category"
                  className={`
                w-full bg-secondary border-primary outline-primary
                p-2 my-2 border-2 rounded-md
              `}
                  onChange={(e) => {
                    setCategory(e.target.value as IBudgetCategories)
                  }}
                >
                  <option value={"Home"}>Home</option>
                  <option value={"Work"}>Work</option>
                  <option value={"Personal"}>Personal</option>
                  <option value={"Tech"}>Tech</option>
                  <option value={"Spiritual"}>Spiritual</option>
                </select>
                <Button variant={"default"} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>

          <InputText placeH={"First name"} />
          <InputText placeH={"Last name"} />
          <InputText placeH={"Email"} />
          <InputText placeH={"Age"} />
          <InputText placeH={"Allergies"} />
          <InputText placeH={"Is Male"} />
          <InputText placeH={"Country"} />
          <InputText placeH={"Department"} />
          <Button onClick={() => router.push("/dashboard")}> Register</Button>
        </div>
      </div>
    </div>
  )
}
