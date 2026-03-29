interface LinkEmbedProps {
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    const { origin } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${origin}&sz=64`;
  } catch {
    return "";
  }
}

function getPathPreview(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return url;
  }
}

export const LinkEmbed = ({ url }: LinkEmbedProps) => {
  const domain = getDomain(url);
  const favicon = getFaviconUrl(url);
  const path = getPathPreview(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/embed flex flex-col h-full min-h-[180px] no-underline overflow-hidden"
    >
      {/* Banner */}
      <div className="relative h-24 bg-gradient-to-br from-violet-600/20 via-purple-500/10 to-indigo-600/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10" />
        <div className="absolute w-20 h-20 bg-violet-500/20 rounded-full blur-2xl" />
        <div className="relative w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover/embed:scale-110 transition-transform duration-300">
          {favicon ? (
            <img
              src={favicon}
              alt={domain}
              className="w-7 h-7 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-3 py-3 bg-black/20">
        <div className="flex items-center gap-2">
          <img src={favicon} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
          <span className="text-white/80 text-xs font-semibold truncate">{domain}</span>
        </div>
        <p className="text-gray-500 text-[11px] truncate">{path === "/" ? url : path}</p>
        <span className="text-violet-400 text-[10px] font-medium group-hover/embed:text-violet-300 transition-colors mt-1">
          Visit site →
        </span>
      </div>
    </a>
  );
};