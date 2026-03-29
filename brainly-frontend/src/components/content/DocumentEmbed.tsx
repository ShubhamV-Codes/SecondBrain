import { DocumentIcon } from "../../icons/DocumentIcon";

interface DocumentPreviewProps {
  url: string;
}

export const DocumentEmbed = ({ url }: DocumentPreviewProps) => {
  const isPDF = url.toLowerCase().includes(".pdf");

  return (
    <div className="mt-3 w-full overflow-hidden">
      {isPDF ? (
        <iframe
          title="Document"
          src={url}
          loading="lazy"
          className="w-full h-48 rounded border max-w-full"
        />
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border p-3 hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded">
              <DocumentIcon size="md" />
            </div>

            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold">
                Open Document
              </p>
          <p className="text-xs text-gray-500 truncate max-w-[180px]">
                {url}
              </p>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};