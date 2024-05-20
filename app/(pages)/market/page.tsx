"use client"

import React from "react"

import SlidingCarousel from "./carousel"
import ProductsSection from "./products"

export default function ProductsPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[95%] md:w-[75%]">
        <SlidingCarousel />
        <ProductsSection />
      </div>
    </div>
  )
}
