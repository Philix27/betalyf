"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button, Icons } from "@/comps"
import { AppStores, NavItem, SettingsContext, cn } from "@/lib"
import { MenuIcon, SidebarClose } from "lucide-react"

import { ThemeToggle } from "@/app/comps"

import { siteConfig } from "./site"

interface MainNavProps {
  items?: NavItem[]
}

export function NavbarHeader({ items }: MainNavProps) {
  const [hideConnectBtn, setHideConnectBtn] = useState(false)
  const { isSidebarOpen, setIsSidebarOpen } = AppStores.useSettingsStore()
  // const settings = useContext(SettingsContext)

  useEffect(() => {
    const w = window as any
    if (w.ethereum && w.ethereum.isMiniPay) {
      setHideConnectBtn(true)
      // connect()
    }
  }, [])

  return (
    <header className="bg-primary sticky top-0 z-20 w-full border-b">
      <div className="container flex h-[60px] items-center justify-between">
        <div className="flex gap-6 md:gap-10 ">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <div className="">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
