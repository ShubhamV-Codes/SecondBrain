interface DocumentEmbedProps {
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getFileName(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/");
    const name = parts[parts.length - 1];
    return name || "Document";
  } catch {
    return "Document";
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

export const DocumentEmbed = ({ url }: DocumentEmbedProps) => {
  const isPDF = url.toLowerCase().includes(".pdf");
  const domain = getDomain(url);
  const filename = getFileName(url);
  const favicon = getFaviconUrl(url);

  if (isPDF) {
    return (
      <div className="flex flex-col h-full min-h-[180px] overflow-hidden">
        <iframe
          title="PDF Document"
          src={url}
          loading="lazy"
          className="w-full h-48 border-0"
        />
        <div className="flex items-center gap-2 px-3 py-2 bg-black/20 border-t border-white/5">
          <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          <span className="text-white/70 text-xs truncate">{filename}</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/embed flex flex-col h-full min-h-[180px] no-underline overflow-hidden"
    >
      {/* Banner */}
      <div className="relative h-24 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-indigo-600/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10" />
        <div className="absolute w-20 h-20 bg-blue-500/20 rounded-full blur-2xl" />
        <div className="relative w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover/embed:scale-110 transition-transform duration-300">
          {favicon ? (
            <img
              src={favicon}
              alt={domain}
              className="w-7 h-7 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-3 py-3 bg-black/20">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          <span className="text-white/80 text-xs font-semibold truncate">{filename}</span>
        </div>
        <p className="text-gray-500 text-[11px] truncate">{domain}</p>
        <span className="text-blue-400 text-[10px] font-medium group-hover/embed:text-blue-300 transition-colors mt-1">
          Open document →
        </span>
      </div>
    </a>
  );
};