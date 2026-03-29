import { useState } from "react";
const API = import.meta.env.VITE_API_URL;
interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function InputComponent({ placeholder, value, onChange, label }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-white/8 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15 transition"
      />
    </div>
  );
}

type ContentType = "document" | "youtube" | "twitter" | "link";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: { title: string; link: string; type: ContentType }) => void;
}

const typeConfig: { type: ContentType; label: string; emoji: string; activeBg: string; activeBorder: string; activeText: string }[] = [
  { type: "youtube",  label: "YouTube",  emoji: "🎬", activeBg: "bg-red-500/15",    activeBorder: "border-red-500/40",    activeText: "text-red-400"    },
  { type: "twitter",  label: "Twitter",  emoji: "𝕏",  activeBg: "bg-sky-500/15",    activeBorder: "border-sky-500/40",    activeText: "text-sky-400"    },
  { type: "link",     label: "Link",     emoji: "🔗", activeBg: "bg-violet-500/15", activeBorder: "border-violet-500/40", activeText: "text-violet-400" },
  { type: "document", label: "Document", emoji: "📄", activeBg: "bg-blue-500/15",   activeBorder: "border-blue-500/40",   activeText: "text-blue-400"   },
];

export function CreateContentModal({ open, onClose, onAdd }: CreateContentModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<ContentType>("link");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleAdd = async () => {
    if (!title.trim() || !link.trim()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/v1/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // sends your JWT
        },
        body: JSON.stringify({ title: title.trim(), link: link.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save content");
        return;
      }

      // Update UI instantly without refetching
      onAdd({ title: title.trim(), link: link.trim(), type });

      // Reset form
      setTitle("");
      setLink("");
      setType("link");
      onClose();

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-gray-900 border border-white/8 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-black/50">

        {/* Subtle glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-blue-600/5 blur-2xl rounded-t-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h2 className="text-white text-lg font-bold">Add Content</h2>
            <p className="text-gray-500 text-xs mt-0.5">Save anything to your second brain</p>
          </div>
          <button title="Close modal" type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-5 relative">

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Title */}
          <InputComponent label="Title" placeholder="e.g. Design inspiration" value={title} onChange={setTitle} />

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</label>
            <div className="grid grid-cols-4 gap-2">
              {typeConfig.map(({ type: t, label, emoji, activeBg, activeBorder, activeText }) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-150
                    ${type === t
                      ? `${activeBg} ${activeBorder} ${activeText}`
                      : "bg-gray-800 border-white/8 text-gray-500 hover:text-white hover:bg-gray-700"
                    }`}
                >
                  <span className="text-base">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Link */}
          <InputComponent label="Link" placeholder="Paste URL here" value={link} onChange={setLink} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 relative">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim() || !link.trim() || loading}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
          >
            {loading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            )}
            {loading ? "Saving..." : "Save to Brain"}
          </button>
        </div>
      </div>
    </div>
  );
}