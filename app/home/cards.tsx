"use client"

import React from "react"
import { AppImg } from "@/lib"

import { TextB, TextH } from "@/app/comps"

const cardItems = [
  {
    title: "Funds",
    img: AppImg.person,
    subtitle: "Manage personal funds and finances in one place",
  },
  {
    title: "Security",
    img: AppImg.lock,
    subtitle:
      "All transactions are tightly secured and processed by Celo Blockchain",
  },
  {
    title: "Friends",
    img: AppImg.phone,
    subtitle:
      "Easily pay utility bills for friends and family with payment link",
  },
]
export default function CardsSection() {
  return (
    <div
      className={`
      grid md:grid-cols-3 grid-cols-1 
      items-start justify-center 
      w-full my-5 gap-4 mx-0
    `}
    >
      {cardItems.map((item, i) => (
        <div
          className={
            "border-r-ring md:mx-4 bg-card rounded-md mb-5"
          }
          key={i}
        >
          <div className="">
            <div className={"w-full flex items-center justify-center px-4"}>
              <div className={`h-[300px] w-[250px]`}>
                <img src={item.img} className={"w-fit h-fit"} />
              </div>
            </div>
            <div className="bg-primary p-4">
              <TextH v="h3" className="mb-4">
                {item.title}
              </TextH>
              <TextB v="p5">{item.subtitle}</TextB>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
