import React from "react"
import { TextB, TextH } from "@/comps"
import { cn } from "@/lib"
import { ChevronRight } from "lucide-react"

import { _dataList } from "./_data"

export default function SettingsPage() {
  return (
    <div className="px-2">
      {_dataList.map((Val, i) => (
        <div
          key={i}
          className="flex justify-between border-b-[0.5px] border-accent py-2 px-3"
        >
          <div className="flex items-center">
            <div className={cn(`mr-[20px] h-full rounded-xl`, Val.color)}>
              <Val.Icon className="text-white m-2" size={18} />
            </div>
            <div className="flex flex-col justify-around">
              <TextH v="h5">{Val.title} </TextH>
            </div>
          </div>
          <div className="flex flex-col justify-around items-end">
            <ChevronRight />
          </div>
        </div>
      ))}
    </div>
  )
}
