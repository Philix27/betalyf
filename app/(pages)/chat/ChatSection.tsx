"use client"

import React from "react"
import { Button, TextB, TextH } from "@/comps"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  MoreVertical,
  SearchIcon,
  SendIcon,
  ShieldClose,
} from "lucide-react"

import { InputText } from "../_comps"
import { IChatData } from "./chatData"

export default function ChatSection(props: {
  setShowActiveChat: React.Dispatch<React.SetStateAction<boolean>>
  data: IChatData
}) {
  return (
    <motion.div
      initial={{ x: 200, opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={`
        fixed top-0 bottom-0 left-0 h-[100vh] bg-background w-full mt-[60px] z-10
    `}
    >
      <div className="h-[50px] border-b border-accent flex items-center justify-between px-3">
        <div className="flex items-center justify-center">
          <div className="mr-[20px] flex items-center justify-center gap-x-2">
            <ChevronLeft
              size={25}
              onClick={() => props.setShowActiveChat(false)}
            />
            <img
              src={props.data.img}
              alt="P"
              className="size-[40px] rounded-[20px]"
            />
          </div>
          <div>
            <TextH v="h5">{props.data.name}</TextH>
            <TextB v="p5">{props.data.lastSeen}</TextB>
          </div>
        </div>
        <div className=" flex gap-x-3">
          <SearchIcon size={15} />
          <MoreVertical size={15} />
        </div>
      </div>
      <div className="p-2 flex flex-col justify-between relative h-[calc(100vh-110px)]">
        <div>Messages</div>
        <div className="absolute bottom-0 w-full">
          <div className="w-full flex items-center justify-center mb-4">
            <InputText Icon={SendIcon} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
