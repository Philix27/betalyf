import React from "react"
import { TextB, TextH } from "@/comps"
import { serviceData } from "./service"

export default function DashboardPage() {
  return (
    <div className="px-6 py-2 w-full flex flex-col items-center justify-center">
      <div className="bg-primary w-full px-4 py-2 rounded-lg mb-4 h-[200px] mt-2">
        <TextH v="h5" className={"text-primary-foreground mb-2"}>
          Find a doctor or other health care workers
        </TextH>
        <div className="w-[80%] border-[1px] border-card">
          <TextB className="text-foreground-card">Search</TextB>
        </div>
      </div>
      <div className="w-full mb-4">
        <TextH v="h4" className={"text-card-foreground mb-2"}>
          Our services
        </TextH>
        <div className={"flex items-center justify-between gap-x-2 w-full"}>
          {serviceData.map((val, i) => {
            const { Icon } = val
            return (
              <div
                key={i}
                className={"w-full text-center flex flex-col items-center"}
              >
                <div
                  className={`w-full h-[60px] bg-card 
                    rounded-xl flex
                    items-center justify-center mb-2`}
                >
                  <Icon className={"text-primary font-extrabold"} size={22} />
                </div>
                <TextB v="p5"> {val.title}</TextB>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
