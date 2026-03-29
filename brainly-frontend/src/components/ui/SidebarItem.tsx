import type { ReactElement } from "react"

interface SidebarProps{
    text :String, 
    icon:ReactElement
}
export const SidebarItem = (props: SidebarProps) => {
  return (
    <div className="flex items-center px-4 py-2 ms-4 hover:bg-gray-100 cursor-pointer">
      <div className="pr-2">{props.icon}</div>
      <div>{props.text}</div>
    </div>
  );
};