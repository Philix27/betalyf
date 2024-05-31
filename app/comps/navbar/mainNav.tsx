"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button, Icons } from "@/comps"
import { AppStores, NavItem, cn } from "@/lib"
import { MenuIcon, SidebarClose, User } from "lucide-react"

import { ThemeToggle } from "@/app/comps"

import { siteConfig } from "./site"

interface MainNavProps {
  items?: NavItem[]
}

export function NavbarHeader({ items }: MainNavProps) {
  const [hideConnectBtn, setHideConnectBtn] = useState(false)
  const { isSidebarOpen, setIsSidebarOpen } = AppStores.useSettingsStore()
  // const settings = useContext(SettingsContext)
  const router = useRouter()
  const pathName = usePathname()

  function showIcon(): boolean {
    const pathsAgainst = ["/", "/sign-up", "/sign-in"]
    const res = pathsAgainst.filter((val) => val === pathName)

    if (res.length > 0) {
      return false
    }
    return true
  }

  useEffect(() => {
    const w = window as any
    if (w.ethereum && w.ethereum.isMiniPay) {
      setHideConnectBtn(true)
      // connect()
    }
  }, [])

  return (
    <header className="bg-primary sticky top-0 z-20 w-full border-b">
      <div className="container flex h-[50px] items-center justify-between">
        <div className="flex gap-6 md:gap-10 ">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block text-primary-foreground font-extrabold">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <div className="">
            {showIcon() && (
              <Link href="/profile">
                <User className="h-[1.5rem] w-[1.3rem text-primary-foreground" />
              </Link>
            )}

            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </header>
  )
}
