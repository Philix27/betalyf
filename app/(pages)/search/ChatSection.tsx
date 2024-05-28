"use client"

import React, { useState } from "react"
import { Button, TextB, TextH } from "@/comps"
import { cn } from "@/lib"
import { motion } from "framer-motion"

import { HeaderRow } from "./Headrow"
import { IChatData } from "./chatData"

export default function ChatSection(props: {
  setShowActiveChat: React.Dispatch<React.SetStateAction<boolean>>
  data: IChatData
}) {
  const [selectTime, setSelectTime] = useState("2 - 4am")


  
  const onSubmit = () => {

  }
  return (
    <motion.div
      initial={{ x: 200, opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={`
        fixed top-0 bottom-0 left-0 h-[100vh] bg-background w-full mt-[60px] z-10
    `}
    >
      <HeaderRow
        data={props.data}
        setShowActiveChat={props.setShowActiveChat}
      />

      <div className="w-full">
        <div className="flex flex-col items-center justify-center mt-[50px] mb-[50px]">
          <img
            src={props.data.img}
            className="h-[30vh] w-[30vh] rounded-[15vh]"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <TextH>{props.data.name}</TextH>
          <TextB>DEPARTMENT: {props.data.department}</TextB>
          <TextB className="">
            Pick a time that would be convenient for you
          </TextB>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center space-x-2 mt-4 gap-3 w-full">
        {time.map((val, index) => (
          <div
            key={index}
            className={cn(
              "px-6 py-2 mx-2 rounded-[5px] ",
              val === selectTime ? "bg-primary" : "outline outline-primary"
            )}
            onClick={() => {
              setSelectTime(val)
            }}
          >
            <TextB
              v="p5"
              className={cn(
                val === selectTime
                  ? "text-primary-foreground"
                  : "text-card-foreground"
              )}
            >
              {val}
            </TextB>
          </div>
        ))}
      </div>
      <div className="w-full my-4 flex items-center justify-center">
        <Button onClick={onSubmit}>Book for $5</Button>
      </div>
    </motion.div>
  )
}

const time = ["2 - 4am", "4 - 6am", "6 - 8am", "8 - 10am"]
