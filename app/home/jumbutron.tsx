"use client"

import React from "react"

import { TextB, TextH } from "@/app/comps"

export default function JumbutronSection(props: {
  title: string
  subtitle: string
}) {
  return (
    <div
      className={`
    flex flex-col items-center 
    gap-4 justify-center 
    max-w-[400px] md:max-w-[80%] 
    md:my-10 my-12 text-center
    `}
    >
      <TextH v={"h2"} className="leading-loose text-xl">
        {props.title}
      </TextH>
      <TextB v={"p6"} className="leading-loose">
        {props.subtitle}
      </TextB>
    </div>
  )
}
