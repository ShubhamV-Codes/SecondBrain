import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";

type ContentType = "document" | "youtube" | "twitter" | "link";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
}
const APIURL = import.meta.env.VITE_API_URL;
const API = `${APIURL}/api/v1`;

const fallbackType = (type: string): ContentType => {
  const valid = ["document", "youtube", "twitter", "link"];
  return valid.includes(type) ? (type as ContentType) : "link";
};

export const SharedBrainPage = () => {
  const { hash } = useParams<{ hash?: string }>(); // ✅ FIX

  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ FIX: handle undefined hash
    if (!hash) {
      setError("Invalid share link.");
      setLoading(false);
      return;
    }

    const fetch_ = async () => {
      try {
        const res = await fetch(`${API}/brain/view/${hash}`);
        let data;
try {
  data = await res.json();
} catch {
  setError("Invalid server response");
  return;
}

        if (!res.ok || !data.success) {
          setError(data.message || "Failed to load.");
          return;
        }

        setContents(
          (data.data.content || []).map((item: any) => ({
            ...item,
            type: fallbackType(item.type),
          }))
        );
      } catch {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [hash]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-white/5 px-8 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
          </svg>
        </div>

        <div>
          <h1 className="text-white font-bold text-sm">Shared Brain</h1>
          <p className="text-gray-500 text-xs">
            {loading ? "Loading..." : `${contents.length} item${contents.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
          Read only
        </span>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {loading && (
          <div className="flex items-center justify-center h-96">
            <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center h-96 text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
            </div>
            <p className="text-white font-semibold">Could not load brain</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && contents.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 text-sm">This brain has no content yet.</p>
          </div>
        )}

        {!loading && !error && contents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {contents.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                type={item.type}
                link={item.link}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};