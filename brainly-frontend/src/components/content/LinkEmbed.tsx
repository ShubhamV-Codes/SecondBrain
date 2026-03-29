import { LinkIcon } from "../../icons/LinkIcon";

interface LinkPreviewProps {
  url: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export const LinkEmbed = ({ url }: LinkPreviewProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-3 rounded-lg border p-3 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded">
          <LinkIcon size="md" />
        </div>

        <div className="overflow-hidden ">
          <p className="text-sm font-semibold">
            {getDomain(url)}
          </p>
          <p className="text-xs text-gray-500 truncate max-w-[180px]">
            {url}
          </p>
        </div>
      </div>
    </a>
  );
};