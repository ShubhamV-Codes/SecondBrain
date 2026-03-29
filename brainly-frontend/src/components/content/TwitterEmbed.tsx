import { useEffect, useRef } from "react";

interface TwitterEmbedProps {
  url: string;
}

function normalizeTwitterUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("x.com")) {
      parsed.hostname = "twitter.com";
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export const TwitterEmbed = ({ url }: TwitterEmbedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const normalizedUrl = normalizeTwitterUrl(url);

  useEffect(() => {
    if ((window as any).twttr && ref.current) {
      (window as any).twttr.widgets.load(ref.current);
    }
  }, [normalizedUrl]);

  return (
    <div
      ref={ref}
      className="h-60 overflow-y-auto no-scrollbar bg-black/10 rounded-xl p-2"
    >
      <blockquote className="twitter-tweet" data-theme="dark">
        <a title="Tweet" href={normalizedUrl} />
      </blockquote>
    </div>
  );
};
