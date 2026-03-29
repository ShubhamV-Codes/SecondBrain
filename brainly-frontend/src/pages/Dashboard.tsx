import { useState, useEffect, type FC } from "react";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/PopupModel/CreateContentModal";
import { SharedBrainModal } from "../components/PopupModel/SharedBrainModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { DocumentIcon } from "../icons/DocumentIcon";

type ContentType = "document" | "youtube" | "twitter" | "link";
type FilterType  = "all" | ContentType;

interface ContentItem {
  _id:   string;
  title: string;
  link:  string;
  type:  ContentType;
}

const APIURL = import.meta.env.VITE_API_URL;
const API    = `${APIURL}/api/v1`;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const sectionTitles: Record<FilterType, string> = {
  all:      "My Brain",
  twitter:  "Twitter",
  youtube:  "YouTube",
  link:     "Links",
  document: "Documents",
};

const navItems: { text: string; type: FilterType; icon: React.ReactNode }[] = [
  {
    text: "All",
    type: "all",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  { text: "Twitter",  type: "twitter",  icon: <TwitterIcon  size="lg" /> },
  { text: "Youtube",  type: "youtube",  icon: <YoutubeIcon  size="lg" /> },
  { text: "Link",     type: "link",     icon: <LinkIcon     size="lg" /> },
  { text: "Document", type: "document", icon: <DocumentIcon size="lg" /> },
];

export const Dashboard: FC = () => {
  const [modalOpen,      setModalOpen]      = useState(false);
  const [contents,       setContents]       = useState<ContentItem[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [filter,         setFilter]         = useState<FilterType>("all");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareHash,      setShareHash]      = useState("");
  const [shareLoading,   setShareLoading]   = useState(false);
  const [isShared,       setIsShared]       = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);

  const fetchContent = async (retries = 2) => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/content`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setContents(data.content ?? []);
    } catch (e) {
      if (retries > 0) {
        setTimeout(() => fetchContent(retries - 1), 3000);
        return;
      }
      console.error("Failed to fetch content", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/delete`, {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ contentId: id }),
      });
      if (res.ok) setContents(prev => prev.filter(c => c._id !== id));
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  const handleShare = async () => {
    if (isShared && shareHash) { setShareModalOpen(true); return; }
    setShareLoading(true);
    try {
      const res  = await fetch(`${API}/brain/share`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ share: !isShared }),
      });
      const data = await res.json();
      if (data.success) {
        if (!isShared) {
          const hash = (data.data.shareLink as string).split("/").pop() ?? "";
          setShareHash(hash);
          setShareModalOpen(true);
          setIsShared(true);
        } else {
          setIsShared(false);
          setShareHash("");
        }
      }
    } catch (e) {
      console.error("Share failed", e);
    } finally {
      setShareLoading(false);
    }
  };

  const filtered = filter === "all"
    ? contents
    : contents.filter(c => c.type === filter);

  const selectFilter = (type: FilterType) => {
    setFilter(type);
    setSidebarOpen(false);
  };

  // ── Sidebar JSX (rendered twice: desktop + mobile drawer) ──
  const sidebarContent = (
    <>
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
          <button
            key={type}
            onClick={() => selectFilter(type)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-200 text-left
                        ${filter === type
                          ? "bg-blue-600/15 border border-blue-500/30 text-blue-300"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
          >
            <span className={filter === type ? "text-blue-400" : "text-gray-600"}>
              {icon}
            </span>
            {text}
            {filter === type && (
              <span className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/signin"; }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500
                     hover:text-red-400 hover:bg-red-500/10 border border-transparent
                     hover:border-red-500/20 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-screen bg-[#050d1a] flex relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-800/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-blue-900/40 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-950/60 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="grid-bg z-0" />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 z-10 flex-col
                        bg-gray-950 border-r border-white/5">
        <div className="absolute top-0 left-0 right-0 h-40 bg-blue-600/10 blur-2xl pointer-events-none" />
        {sidebarContent}
      </aside>

      {/* ── Mobile drawer ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col
                    bg-gray-950 border-r border-white/5
                    transition-transform duration-300 ease-in-out lg:hidden
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="absolute top-0 left-0 right-0 h-40 bg-blue-600/10 blur-2xl pointer-events-none" />
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {sidebarContent}
      </aside>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen min-w-0 lg:ml-64">

        {/* Topbar */}
        <div className="sticky top-0 z-10 backdrop-blur-2xl bg-blue-950/20 border-b border-blue-800/30
                        px-4 sm:px-8 py-4 flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden text-blue-500 hover:text-blue-300 transition shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="text-white font-extrabold text-lg sm:text-xl tracking-tight truncate">
                {sectionTitles[filter]}
              </h1>
              <p className="text-blue-500/60 text-xs mt-0.5">
                {loading
                  ? "Loading..."
                  : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} saved`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Share */}
            <button
              onClick={handleShare}
              disabled={shareLoading}
              title={shareLoading ? "Updating..." : isShared ? "Sharing ON" : "Share Brain"}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold
                          border transition-all duration-200 disabled:opacity-40
                          ${isShared
                            ? "bg-blue-600/20 border-blue-500/40 text-blue-300 hover:bg-blue-600/30"
                            : "bg-blue-950/40 border-blue-800/40 text-blue-500 hover:border-blue-500/50 hover:text-blue-300"
                          }`}
            >
              <ShareIcon size="md" />
              <span className="hidden sm:inline">
                {shareLoading ? "Updating..." : isShared ? "Sharing ON" : "Share Brain"}
              </span>
            </button>

            {/* Add Content */}
            <button
              onClick={() => setModalOpen(true)}
              title="Add Content"
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                         text-white border border-blue-500/30 shadow-lg shadow-blue-900/50
                         transition-all duration-200"
            >
              <PlusIcon size="md" />
              <span className="hidden sm:inline">Add Content</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-64 sm:h-96">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                  <svg className="relative w-8 h-8 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                </div>
                <p className="text-blue-500/60 text-sm">Loading your brain...</p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 sm:h-96 text-center px-4">
              <div className="relative bg-blue-950/30 backdrop-blur-2xl border border-blue-800/30
                              rounded-3xl p-8 sm:p-10 max-w-sm w-full shadow-2xl shadow-blue-950/60">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px
                                bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20
                                flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor"
                       strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h3 className="text-white font-extrabold text-lg mb-2 tracking-tight">
                  {filter === "all" ? "Nothing saved yet" : `No ${sectionTitles[filter]} saved yet`}
                </h3>
                <p className="text-blue-500/60 text-sm mb-6">
                  {filter === "all"
                    ? "Start adding links, tweets, videos and documents."
                    : `Add your first ${sectionTitles[filter].toLowerCase()} item.`}
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                             text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500
                             hover:from-blue-500 hover:to-blue-400 text-white border border-blue-500/30
                             shadow-lg shadow-blue-900/50 transition-all duration-200"
                >
                  <PlusIcon size="md" />
                  Add your first item
                </button>
              </div>
            </div>
          )}

          {/* Cards grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map(item => (
                <Card
                  key={item._id}
                  title={item.title}
                  type={item.type}
                  link={item.link}
                  onDelete={() => handleDelete(item._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={() => fetchContent()}
      />

      {shareModalOpen && shareHash && (
        <SharedBrainModal
          hash={shareHash}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </div>
  );
};