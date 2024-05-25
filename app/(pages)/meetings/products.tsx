"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib"

import { Button, TextB, TextH } from "@/app/comps"

import { ISales, dataList } from "./products.data"

export default function ProductsSection() {
  const router = useRouter()
  const [salesToShow, setSalesToShow] = useState<"ALL" | "BUY" | "SELL">("ALL")

  // const ItemsList = dataList.filter(
  //   (val, i) => val.vendorSalesStatus === salesToShow
  // )

  function getList() {
    if (salesToShow === "ALL") {
      return dataList
    } else {
      return dataList.filter((val, i) => val.vendorSalesStatus === salesToShow)
    }
  }
  return (
    <div
      className={`
      mt-4  flex flex-col 
      items-center justify-center
      mb-[70px]
    `}
    >
      <div className="flex mb-4 gap-x-2 w-full">
        <Button
          className={"flex-grow bg-blue-600"}
          onClick={() => setSalesToShow("ALL")}
        >
          All
        </Button>
        <Button
          className={"flex-grow bg-green-600"}
          onClick={() => setSalesToShow("BUY")}
        >
          Pending
        </Button>
        <Button
          className={"flex-grow bg-red-600"}
          onClick={() => setSalesToShow("SELL")}
        >
          Completed
        </Button>
      </div>
      <div
        className={`
      grid md:grid-cols-3 grid-cols-1
      items-start justify-center 
      w-full mx-0
    `}
      >
        {getList().concat(getList(), getList()).map((item, i) => (
          <div
            className={"md:mx-4 rounded-md bg-card p-3 mb-2"}
            key={i}
            onClick={() => router.push(`/products/${i}`)}
          >
            <div className={"w-full flex flex-col"}>
              <div className="flex items-center justify-between">
                <TextH v="h3">NGN {item.amount}</TextH>
                <TextB className={"text-primary-foreground"}>
                  Price per 1 USDT
                </TextB>
              </div>
              <hr
                className={cn(
                  "border-4 w-full my-4",
                  item.vendorSalesStatus === "BUY"
                    ? "border-green-600"
                    : "border-red-600"
                )}
              />
              <RowText
                title="Available balance:"
                subtitle={item.vendorAvailableBalance}
              />
              <RowText title="Limit:" subtitle={item.vendorLimit} />
              <RowText title="Vendor:" subtitle={item.vendorName} />
              <RowText
                title="Payment method"
                subtitle={item.vendorPaymentMethod}
              />
              <RowText title="Trades count" subtitle={item.vendorTradesCount} />
              <RowText
                title="Trades Percentage"
                subtitle={item.vendorTradesPercentage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RowText(props: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between">
      <TextH v="h5">{props.title}</TextH>
      <TextB className={"text-card-foreground"}>{props.subtitle}</TextB>
    </div>
  )
}
