import React from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { AppImg } from "@/lib"
// requires a loader
import { Carousel } from "react-responsive-carousel"

export default function SlidingCarousel() {
  return (
    <div
      className={`
        max-h-[15vh] w-full h-[15vh] rounded-xl mt-2 md:mt-8
    `}
    >
          <Carousel
        className="w-full rounded-xl"
        autoPlay={true}
        // centerMode={true}
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        swipeable={true}
        stopOnHover={false}
        dynamicHeight={false}
        width={"100%"}
        // thumbWidth={100}
        autoFocus={true}
      >
        {...data.map((val, i) => (
          <div className="w-full h-[15vh] md:h-[500px] rounded-xl" key={i}>
            <img src={val.img} className="w-full h-full rounded-xl" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

const data = [
  { img: AppImg.green.field },
  { img: AppImg.green.grid },
  { img: AppImg.green.sun },
  { img: AppImg.green.homes },
  { img: AppImg.green.workers },
]
