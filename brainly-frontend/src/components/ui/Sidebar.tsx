import { BrainIcon } from "../../icons/BrainIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

type ContentType = "all" | "twitter" | "youtube" | "link" | "document";

interface SidebarProps {
  active: ContentType;
  onSelect: (type: ContentType) => void;
}

const navItems = [
  { text: "All",      type: "all"      as ContentType, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { text: "Twitter",  type: "twitter"  as ContentType, icon: <TwitterIcon  size="lg" /> },
  { text: "Youtube",  type: "youtube"  as ContentType, icon: <YoutubeIcon  size="lg" /> },
  { text: "Link",     type: "link"     as ContentType, icon: <LinkIcon     size="lg" /> },
  { text: "Document", type: "document" as ContentType, icon: <DocumentIcon size="lg" /> },
];

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  return (
    <div className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-gray-950 border-r border-white/5">

      <div className="absolute top-0 left-0 right-0 h-40 bg-blue-600/10 blur-2xl pointer-events-none" />

      {/* Logo */}
      <div className="relative px-5 py-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.2)]">
          <span className="text-blue-400">
            <BrainIcon size="lg" />
          </span>
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Brainly</p>
          <p className="text-gray-500 text-xs">Your Second Brain</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-5 space-y-1 overflow-y-auto relative">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-1 mb-3">
          Library
        </p>
        {navItems.map(({ text, type, icon }) => (
          <SidebarItem
            key={type}
            text={text}
            icon={icon}
            active={active === type}
            onClick={() => onSelect(type)}
          />
        ))}
      </div>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/signin";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
};