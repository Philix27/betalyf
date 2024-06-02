"use client"

import React, { useState } from "react"
import { Button, TextB, TextH } from "@/comps"
import { SearchIcon } from "lucide-react"

import { InputText } from "../_comps"
import { IDataList, dataList } from "./data"
import ChatSection from "./details"

export default function PharmacyPage() {
  const [showActiveChat, setShowActiveChat] = useState(false)
  const [_chatData, setChatData] = useState<IDataList>()

  function setupModal(data: IDataList) {
    setShowActiveChat(true)
    setChatData(data)
  }

  return (
    <div className="px-2 bg-background">
      <div className="w-full flex items-center justify-center my-2 ">
        <InputText
          Icon={SearchIcon}
          placeH={"Find a Physician"}
          className="w-[80%]"
        />
      </div>
      <div className={"grid grid-cols-2 gap-4"}>
        {dataList.map((val, i) => (
          <div
            key={i}
            className="flex flex-col border-accent bg-card items-start justify-between"
            onClick={() => setupModal(val)}
          >
            <div className="">
              <img
                src={val.img}
                alt="P"
                className="h-[200] w-full rounded-[5px]"
              />
            </div>
            <div className="flex flex-col justify-around py-1 px-2 ">
              <TextH v="h5">{val.name}</TextH>
              <TextB>{val.department}</TextB>
            </div>
            <Button className={"w-full"}>Add</Button>
          </div>
        ))}
      </div>
      {showActiveChat && (
        <ChatSection data={_chatData!} setShowActiveChat={setShowActiveChat} />
      )}
    </div>
  )
}
