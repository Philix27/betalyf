import { AppImg } from "@/lib"

export type IChatData = {
  name: string
  department: string
  img: string
}
export const chatData: IChatData[] = [
  {
    name: "Dr. Chuks Okolie",
    department: "Peadiatric",
    img: AppImg.secure,
  },
  {
    name: "Nurs. Lena Hertz",
    department: "Emergency",
    img: AppImg.block,
  },
  {
    name: "Dr. Millie Bobbie",
    department: "Orthopedic",
    img: AppImg.green.homes,
  },
  {
    name: "Dr. Raymond Lin",
    department: "Obstetrics",
    img: AppImg.creditCard,
  },
  {
    name: "Pharm. Raymond Lin",
    department: "Pharmacy",
    img: AppImg.creditCard,
  },
]
