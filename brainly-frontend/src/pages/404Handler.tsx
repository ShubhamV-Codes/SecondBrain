// src/pages/NotFound.tsx
import { type FC } from "react";
import { BrainIcon } from "../icons/BrainIcon";

export const NotFound: FC = () => {
  return (
    <div className="min-h-screen w-screen bg-[#050d1a] flex items-center justify-center relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-950/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(59,130,246,0.25)] mb-8">
          <span className="text-blue-400">
            <BrainIcon size="lg" />
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-[7rem] sm:text-[10rem] font-extrabold leading-none tracking-tighter
                       bg-gradient-to-b from-blue-400 to-blue-900/40 bg-clip-text text-transparent
                       select-none">
          404
        </h1>

        <h2 className="text-white font-bold text-xl sm:text-2xl mt-2 tracking-tight">
          Page not found
        </h2>
        <p className="text-blue-500/60 text-sm mt-3 max-w-xs">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                       text-white border border-blue-500/30 shadow-lg shadow-blue-900/50
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12L12 3l9 9M4 10v10a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10"/>
            </svg>
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-blue-950/40 border border-blue-800/40 text-blue-400
                       hover:border-blue-500/50 hover:text-blue-300
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};