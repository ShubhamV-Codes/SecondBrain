import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { TwitterEmbed } from "../content/TwitterEmbed";
import { YoutubeEmbed } from "../content/YoutubeEmbed";
import { DocumentEmbed } from "../content/DocumentEmbed";
import { LinkEmbed } from "../content/LinkEmbed";

interface CardProps {
  title: string;
  link: string;
  type: "document" | "youtube" | "twitter" | "link";
  onDelete?: () => void;
}

const typeConfig = {
  youtube: {
    label: "YouTube",
    color: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
    gradient: "from-red-600/20 via-red-500/5 to-transparent",
    glow: "group-hover:shadow-red-900/40",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
      </svg>
    ),
  },
  twitter: {
    label: "Twitter",
    color: "text-sky-400",
    border: "border-sky-500/30",
    dot: "bg-sky-400",
    gradient: "from-sky-600/20 via-sky-500/5 to-transparent",
    glow: "group-hover:shadow-sky-900/40",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  document: {
    label: "Document",
    color: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
    gradient: "from-blue-600/20 via-blue-500/5 to-transparent",
    glow: "group-hover:shadow-blue-900/40",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  link: {
    label: "Link",
    color: "text-violet-400",
    border: "border-violet-500/30",
    dot: "bg-violet-400",
    gradient: "from-violet-600/20 via-violet-500/5 to-transparent",
    glow: "group-hover:shadow-violet-900/40",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
};

const fallbackConfig = typeConfig.link;

export const Card = ({ title, link, type, onDelete }: CardProps) => {
  const config = typeConfig[type] ?? fallbackConfig;

  return (
    <div className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${config.glow}
      bg-white/[0.04] backdrop-blur-xl border ${config.border}
      shadow-lg shadow-black/20`}
    >
      {/* Gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${config.gradient} pointer-events-none z-0`} />

      {/* Shimmer on hover */}
      

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.03]" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between px-4 pt-4 pb-3 gap-2">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          {/* Badge */}
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit border ${config.badge}`}>
            <span className={config.color}>{config.icon}</span>
            {config.label}
          </span>
          {/* Title */}
          <h3 className="text-white/90 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-white transition-colors duration-200">
            {title}
          </h3>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-150"
            title="Open"
          >
            <ShareIcon size="md" />
          </a>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
            title="Delete"
          >
            <DeleteIcon size="md" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 h-px bg-white/5 mx-4 mb-3" />

      {/* Embed — bigger area */}
      <div className="relative z-10 px-3 pb-3 flex-1">
        <div className="rounded-xl overflow-hidden bg-black/20 border border-white/5 min-h-[200px]">
          {type === "youtube"  && <YoutubeEmbed  url={link} />}
          {type === "twitter"  && <TwitterEmbed  url={link} />}
          {type === "document" && <DocumentEmbed url={link} />}
          {type === "link"     && <LinkEmbed     url={link} />}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-4 py-3 border-t border-white/5 flex items-center gap-2">
        <span className={`shrink-0 ${config.color}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
        </span>
        <span className="text-gray-600 text-xs truncate group-hover:text-gray-400 transition-colors duration-200">{link}</span>
      </div>
    </div>
  );
};