import React from "react"
import { TextB, TextH } from "@/comps"
import { SearchIcon } from "lucide-react"
import { serviceData } from "./service"

export default function DashboardScreen() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
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
      <div className="bg-primary w-full px-4 py-4 rounded-lg mb-4 h-[200px] mt-2 flex flex-col justify-between">
        <div className="w-[70%]">
          <TextH v="h3" className={"text-primary-foreground mb-2"}>
            Find a doctor or
          </TextH>
          <TextH v="h3" className={"text-primary-foreground mb-2"}>
            other health care workers
          </TextH>
        </div>
        <div className="w-[80%] bg-card px-4 py-3 rounded-lg flex items-center">
          <div className="mr-2">
            <SearchIcon />
          </div>
          <TextB v="p4" className="card-foreground">
            Search for a physician
          </TextB>
        </div>
      </div>
    </div>
  )
}
