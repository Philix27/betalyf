import React from "react"
import { Button, TextB, TextH } from "@/comps"
import { AppImg } from "@/lib"

export default function ProductsDetailsPage() {
  return (
    <div className="w-full flex-col md:flex-row flex h-[calc(100vh-70px)]">
      <div
        className={`
        md:w-[50%] w-full h-full
        flex flex-col items-center justify-center
      `}
      >
        <div className="h-[300px]">
          <img src={AppImg.green.homes} className="h-full" />
        </div>
      </div>
      <div className="md:w-[50%] w-full py-4 px-4 flex flex-col items-center h-full">
        <div className="w-[100%] md:w-[80%] flex flex-col  justify-between h-full">
          <div>
            <div className="mt-8 border-b-[1px] border-secondary pb-2">
              <TextH v="h3">Name of Item</TextH>
              <TextB>
                Subtitle, SubtitleSubtitleSubtitleSubtitleSubtitleSubtitle
              </TextB>
            </div>
            <div className="mb-5">
              <TextH v="h3">$6,000</TextH>
            </div>
            <TextB className="my-4">How do you wish to pay</TextB>
            <div className="flex gap-x-2 my-4">
              <Button variant={"outline"}>1 month</Button>
              <Button variant={"outline"}>2 month</Button>
              <Button variant={"outline"}>3 month</Button>
              <Button variant={"outline"}>4 month</Button>
            </div>
            <div className="my-4">
              <div className="mb-5 flex items-center">
                <TextH v="h4" className="mr-2">
                  $1,000
                </TextH>
                <TextB>per month</TextB>
              </div>
            </div>
            <Button>Buy now</Button>
          </div>

          <div className="bg-accent w-full p-4 mt-4 md:mt-0">
            <TextB>Ensure you have everything</TextB>
          </div>
        </div>
      </div>
    </div>
  )
}
