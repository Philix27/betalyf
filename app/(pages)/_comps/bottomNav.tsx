"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { TextB } from "@/comps"
import { cn } from "@/lib"
import {
  BookIcon,
  Cog,
  HomeIcon,
  LucideDollarSign,
  LucideIcon,
  MessageCircle,
  SearchIcon,
  UserCog,
} from "lucide-react"

export function BottomNav() {
  const router = useRouter()
  const path = usePathname()

  function isActive(link: string): boolean {
    if (link === path) {
      return true
    }
    return false
  }

  return (
    <div
      className={`
        fixed bottom-0 h-[60px] 
        border-t-[0.5px] 
        w-full flex items-center justify-center 
      `}
    >
      <div
        className={`
      flex justify-between items-center
      px-8 py-2 w-[70%] mb-4
      bg-primary rounded-[50px]`}
      >
        {navItems.map(({ Icon, title, link }, i) => {
          return (
            <div
              onClick={() => router.push(link)}
              key={i}
              className={cn(
                `size-[40px] 
              flex flex-col items-center justify-center
              rounded-[15px]`,
                isActive(link) ? "bg-secondary" : "bg-primary"
              )}
            >
              <Icon className={"text-primary-foreground"} size={20} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
const navItems: { title: string; Icon: LucideIcon; link: string }[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    Icon: HomeIcon,
  },
  {
    title: "Search",
    link: "/search",
    Icon: SearchIcon,
  },
  {
    title: "Appointments",
    link: "/meetings",
    Icon: BookIcon,
  },
  {
    title: "Profile",
    link: "/profile",
    Icon: Cog,
  },
]
