import { AppImg } from "@/lib"
import { BellIcon, LucideIcon, SettingsIcon, Sun } from "lucide-react"

export type IChatData = {
  title: string
  Icon: LucideIcon
  color: string
}
export const _dataList: IChatData[] = [
  {
    title: "Profile",
    Icon: SettingsIcon,
    color: "bg-cyan-600",
  },
  {
    title: "Theme",
    Icon: Sun,
    color: "bg-red-600",
  },
  {
    title: "Notifications",
    Icon: BellIcon,
    color: "bg-green-400",
  },
]
