"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppInput, AppSelect, Button, Form, TextH } from "@/comps";
import { transferCusdTokens } from "@/contract";
import { cn, trpc } from "@/lib";
import { SCUtils, useMinipay } from "@/sc";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



import { IFormSchema, defaultValues, formSchema } from "./schema";
import styles from "./styles.module.css";


export default function SignUpForm() {
  const router = useRouter()
  const { walletAddress } = useMinipay()
  
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })
  const t = trpc.user.registerUser.useMutation()

  async function onSubmit(values: IFormSchema) {
    // router.push("/dashboard")
    try {
      const lookupAddress = await SCUtils.getAddress(
        values.drEmail,
        walletAddress
      )

      if (lookupAddress) {
        // todo: verify if email if for a physician
        transferCusdTokens({
          env: "CUSD_TESTNET",
          userAddress: walletAddress!,
          to: lookupAddress,
          amount: values.amount,
        })
        const successfulReg = SCUtils.getAddress(values.drEmail, walletAddress)
        toast.success("Registered on social connect!")
      } else {
        toast.error("Physician not registered")
      }

      toast.success("Account created!")

      router.push("/dashboard")
    } catch (error) {
      toast.error("oops an error occured")
      console.log("SignUp Error", error)
    }
  }

  return (
    <div
      className={cn(
        `
    w-full h-[calc(100vh-50px)] 
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
        <div
          className={`
      flex flex-col gap-y-4 w-full px-4 rounded-2xl border-primary 
        border-[1px] bg-slate-300/85 py-2
      `}
        >
          <TextH>Register with us</TextH>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`
            w-full flex flex-col 
            items-center 
            justify-center 
            my-4
        `}
            >
              <div className={"w-[95%] space-y-4 flex flex-col"}>
                <AppInput control={form.control} name="drEmail" label="Email" />
                <AppInput
                  control={form.control}
                  name="amount"
                  label="Age"
                  type="no"
                />

                <Button variant={"default"} type="submit" className="mt-4">
                  Tip
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}