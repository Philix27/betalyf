import React from "react"
import { TextB, TextH } from "@/comps"
import { _dataList } from "./chatData"

export default function TransactionsPage() {
  return (
    <div className="px-2">
      {_dataList.concat(_dataList, _dataList, _dataList).map((val, i) => (
        <div
          key={i}
          className="flex justify-between border-b-[0.5px] border-accent py-2 px-3"
        >
          <div className="flex flex-col justify-around">
            <TextH v="h5">{val.name}</TextH>
            <TextB>{val.lastSeen}</TextB>
          </div>
          <div className="flex flex-col justify-around items-end">
            <TextH v="h5">{val.name}</TextH>
            <TextB>{val.lastSeen}</TextB>
          </div>
        </div>
      ))}
    </div>
  )
}
