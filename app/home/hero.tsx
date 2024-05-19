"use client"

import React from "react"
import Image from "next/image"

import { TextB, TextH } from "@/app/comps"

export default function HeroSection(props: {
  title: string
  subtitle: string
  img: string
  imgFirst?: boolean
}) {
  return (
    <div
      className={`
        min-h-[400px] w-full 
        grid grid-cols-1
        md:grid-cols-2
         md:px-[5%] rounded-2xl bg-card
    `}
    >
      {props.imgFirst ? (
        <>
          <div className={"flex items-center justify-center"}>
            <img
              src={props.img}
              alt=""
             className={"h-[80%] w-[90%] md:w-full rounded-lg"}
            />
          </div>
          <div className={`
            h-full flex flex-col 
            items-start justify-center 
            px-2 md:px-4 py-8 md:py-4
          `}>
            <TextH className="text-2xl font-extrabold">{props.title}</TextH>
            <div className="mb-10" />
            <TextB v={"p4"}>{props.subtitle}</TextB>
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex flex-col items-start justify-center px-4 md:px-4 py-8 md:py-4">
            <TextH className="text-2xl font-extrabold">{props.title}</TextH>
            <div className="mb-10" />
            <TextB v={"p4"}>{props.subtitle}</TextB>
          </div>
          <div className={"flex items-center justify-center"}>
            <img
              src={props.img}
              alt=""
              // className={"h-[300px] w-[200px] md:h-[450px] md:w-[350px]"}
              className={"h-[80%] w-[90%] md:w-full rounded-lg"}
            />
          </div>
        </>
      )}
    </div>
  )
}
