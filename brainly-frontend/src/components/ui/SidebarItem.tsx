import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ text, icon, active = false, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group
        ${active
          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
    >
      <span className={`transition-colors duration-200 ${active ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"}`}>
        {icon}
      </span>
      <span>{text}</span>
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
      )}
    </button>
  );
};