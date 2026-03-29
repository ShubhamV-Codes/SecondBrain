interface InputProps{
  placeholder:string
  value:string
  onChange:(value:string)=>void
}

function InputComponent({ placeholder, value, onChange}:InputProps){
  return <input placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} className="text-center max-w-full p-2 items-center"/>
}
import { useState } from "react";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

type ContentType = "document" | "youtube" | "twitter" | "link";

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<ContentType>("document");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Add Content</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <InputComponent
          placeholder="Enter title"
          value={title}
          onChange={setTitle}
        />

        {/* Type Selection */}
        <div className="mt-4">
          <p className="text-sm mb-2 text-gray-600">Select Type</p>
          <div className="grid grid-cols-2 gap-2">
            {(["document", "youtube", "twitter", "link"] as ContentType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`p-2 rounded-md border text-sm capitalize transition ${
                  type === t
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Link */}
        <div className="mt-4">
          <InputComponent
            placeholder="Paste link here"
            value={link}
            onChange={setLink}
          />
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log({ title, link, type });
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}