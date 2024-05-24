"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { InputText } from "@/(pages)/_comps"
import { Button, TextB, TextH } from "@/comps"

export default function SignInPage() {
  const router = useRouter()
  return (
    <div
      className={`
    w-full h-[calc(100vh-60px)] 
      flex flex-col items-center justify-center

    `}
    >
      <div className="w-[70%] flex flex-col gap-y-4 items-center justify-center text-center">
        <TextH>Register with us</TextH>
        <TextB v="p4">Have free access to over 100 physicians</TextB>
        <div
          className={`
      flex flex-col gap-y-4 w-full
        py-6 px-4 rounded-2xl border-primary border-[1px]
      `}
        >
          <InputText placeH={"First name"} />
          <InputText placeH={"Last name"} />
          <Button onClick={() => router.push("/dashboard")}> Register</Button>
        </div>
      </div>
    </div>
  )
}
