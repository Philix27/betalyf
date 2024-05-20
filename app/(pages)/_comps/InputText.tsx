import { LucideIcon } from "lucide-react"

export function InputText(props: { Icon: LucideIcon }) {
  const { Icon } = props
  return (
    <div className="bg-primary rounded-lg w-4/5 flex items-center justify-center px-2">
      <input
        className="py-2 px-2 bg-transparent rounded-2xl w-full outline-none"
        type="text"
        placeholder="Search for a friend"
      />
      <div className={`
        size-[30px] rounded-[15px] 
        flex items-center 
        justify-center bg-secondary
      `}>
        <Icon size={14} />
      </div>
    </div>
  )
}
