import { useState } from "react";

interface SharedBrainModalProps {
  hash: string;
  onClose: () => void;
}

export const SharedBrainModal = ({ hash, onClose }: SharedBrainModalProps) => {
  const shareLink = `http://localhost:5173/brain/${hash}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    alert("Failed to copy");
  }
};

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div className="relative w-full max-w-md bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-6">

        {/* Glow */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-blue-600/10 blur-2xl pointer-events-none rounded-t-2xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">Share Your Brain</h2>
              <p className="text-gray-500 text-xs">Anyone with this link can view</p>
            </div>
          </div>
          <button
            onClick={onClose}
            title="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Link box */}
        <div className="relative flex items-center gap-2 bg-gray-800/80 border border-white/8 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
          <span className="text-gray-400 text-xs truncate flex-1">{shareLink}</span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`mt-3 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${copied
              ? "bg-green-600/20 border border-green-500/30 text-green-400"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30"
            }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};