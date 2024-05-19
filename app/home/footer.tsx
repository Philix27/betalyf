"use client"

import React from "react"
import { Github, LinkedinIcon, MailIcon } from "lucide-react"

import { TextB, TextH } from "@/app/comps"

export default function FooterSection() {
  return (
    <div
      className={`
      w-full border-t-[1px] border-primary h-[50px]`}
    >
      <div className="pt-2 h-full flex items-center justify-around w-full">
        <div className={"flex gap-x-4"}>
          <Github />
          <LinkedinIcon />
          <MailIcon />
        </div>
      </div>
    </div>
  )
}
