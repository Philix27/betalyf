"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, TextB, TextH } from "@/comps"
import { cn } from "@/lib"
import { Stethoscope } from "lucide-react"

import FooterSection from "./footer"
import styles from "./styles.module.css"

export default function HomeClient() {
  const router = useRouter()

  return (
    <div
      className={cn(
        `
      w-full m-0 p-0 
      flex flex-col 
      justify-end items-center 
      h-[calc(100vh-50px)]
    `,
        styles.container
      )}
    >
      <div
        className={`
        p-4 flex flex-col bg-card
        w-[80%] 
        text-center rounded-2xl gap-y-3
        mb-8
      `}
      >
        <TextH v="h1" className={"text-[24px] md:text-[50px]"}>
          Book a call with your favorite Doctor
        </TextH>
        <div className="">
          <TextB v={"p4"}>Cannot access your doctor? Worry no more!</TextB>
        </div>

        <div className={"flex items-center justify-center"}>
          <Button
            onClick={() => {
              router.push("/sign-in")
            }}
          >
            <Stethoscope size={17} className="mr-2" /> Get started
          </Button>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
