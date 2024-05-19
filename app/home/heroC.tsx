"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { AppImg } from "@/lib"

import { Button, TextB, TextH } from "@/app/comps"

export default function HeroCenter(props: { title: string; subtitle: string }) {
  const router = useRouter()
  return (
    <div
      className={`
         w-full flex-1
        flex items-center justify-center
        bg-cover bg-center relative
        bg-gradient-to-r from-cyan-600 to-blue-700 flex-grow
    `}
    >
      <div className="bg-gradient-to-r from-teal-900/70 to-green-950/70 absolute w-full h-full" />
      <div
        className={`absolute top-0
        pt-4 h-full flex flex-col 
        items-center justify-center 
        w-[95%] px-2 md:px-[5%]
        md:w-[55%]
         text-center text-primary-foreground
      `}
      >
        <TextH v="h1" className={"text-[24px] md:text-[50px]"}>
          {props.title}
        </TextH>
        <div className="mb-10" />
        <div className="w-4/5">
          <TextB v={"p4"}>{props.subtitle}</TextB>
        </div>
        <Button className="mt-4" onClick={() => router.push("/products")}>Start Shopping</Button>
      </div>
    </div>
  )
}
