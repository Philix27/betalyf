"use client"

import React, { useState } from "react"
import { TextB, TextH } from "@/comps"
import { SearchIcon } from "lucide-react"

import { InputText } from "../_comps"
import ChatSection from "./ChatSection"
import { IChatData, chatData } from "./chatData"

export default function ChatPage() {
  const [showActiveChat, setShowActiveChat] = useState(false)
  const [_chatData, setChatData] = useState<IChatData>()

  function setupModal(data: IChatData) {
    setShowActiveChat(true)
    setChatData(data)
  }

  return (
    <div className="px-2">
      <div className="w-full flex items-center justify-center my-2 ">
        <InputText Icon={SearchIcon} />
      </div>
      {chatData.concat(chatData, chatData, chatData).map((val, i) => (
        <div
          key={i}
          className="flex border-b-[0.5px] border-accent py-2 px-3"
          onClick={() => setupModal(val)}
        >
          <div className="mr-[20px]">
            <img src={val.img} alt="P" className="size-[50px] rounded-[25px]" />
          </div>
          <div className="flex flex-col justify-around">
            <TextH v="h5">{val.name}</TextH>
            <TextB>{val.lastSeen}</TextB>
          </div>
        </div>
      ))}
      {showActiveChat && (
        <ChatSection data={_chatData!} setShowActiveChat={setShowActiveChat} />
      )}
    </div>
  )
}
