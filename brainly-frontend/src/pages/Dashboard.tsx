import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/PopupModel/CreateContentModal";
import { SharedBrainModal } from "../components/PopupModel/SharedBrainModal";
import { Sidebar } from "../components/ui/Sidebar";

type ContentType = "document" | "youtube" | "twitter" | "link";
type FilterType = "all" | ContentType;

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
}
const APIURL = import.meta.env.VITE_API_URL;
const API = `${APIURL}/api/v1`;

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

const sectionTitles: Record<FilterType, string> = {
  all:      "My Brain",
  twitter:  "Twitter",
  youtube:  "YouTube",
  link:     "Links",
  document: "Documents",
};

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareHash, setShareHash] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/content`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setContents(data.content || []);
    } catch (e) {
      console.error("Failed to fetch content", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, []);

  const handleAdd = () => fetchContent();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/delete`, {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ contentId: id }),
      });
      if (res.ok) setContents((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

const handleShare = async () => {
  // ✅ If already shared, just reopen modal with existing hash
  if (isShared && shareHash) {
    setShareModalOpen(true);
    return;
  }

  setShareLoading(true);
  try {
    const res = await fetch(`${API}/brain/share`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ share: !isShared }),
    });
    const data = await res.json();

    if (data.success) {
      if (!isShared) {
        // Turning ON — save hash and open modal
        const link: string = data.data.shareLink;
        const hash = link.split("/").pop() || "";
        setShareHash(hash);
        setShareModalOpen(true);
        setIsShared(true);
      } else {
        // Turning OFF
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
    : contents.filter((c) => c.type === filter);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar active={filter} onSelect={setFilter} />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        {/* Topbar */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-gray-950/80 border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">{sectionTitles[filter]}</h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {loading ? "Loading..." : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
  variant={isShared ? "primary" : "secondary"}  // glows blue when active
  text={shareLoading ? "Updating..." : isShared ? "Sharing ON" : "Share Brainly"}
  size="md"
  startIcon={<ShareIcon size="md" />}
  onClick={handleShare}
/>
            <Button
              variant="primary"
              text="Add Content"
              size="md"
              startIcon={<PlusIcon size="md" />}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">

          {loading && (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-3">
                <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <p className="text-gray-500 text-sm">Loading your brain...</p>
              </div>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">
                {filter === "all" ? "Nothing saved yet" : `No ${sectionTitles[filter]} saved yet`}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {filter === "all" ? "Start adding links, tweets, videos and documents." : `Add your first ${sectionTitles[filter].toLowerCase()} item.`}
              </p>
              <Button variant="primary" text="Add your first item" size="md" startIcon={<PlusIcon size="md" />} onClick={() => setModalOpen(true)} />
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
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

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
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