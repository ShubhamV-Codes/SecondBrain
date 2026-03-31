import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

// ── Typewriter hook ────────────────────────────────────────────────────────
const WORDS = ["Links", "Docs", "Ideas"];

const useTypewriter = () => {
  const [idx,  setIdx]  = useState(0);
  const [text, setText] = useState("");
  const [del,  setDel]  = useState(false);

  useEffect(() => {
    const target = WORDS[idx % WORDS.length];
    const speed  = del ? 60 : 110;
    const timer  = setTimeout(() => {
      if (!del) {
        const next = target.slice(0, text.length + 1);
        setText(next);
        if (next === target) setTimeout(() => setDel(true), 1400);
      } else {
        const next = target.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, idx]);

  return text;
};

// ── Constellation canvas ───────────────────────────────────────────────────
const StarCanvas: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx    = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  Math.random() * 1.4 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.45)";
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(59,130,246,${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ── Brain SVG ──────────────────────────────────────────────────────────────
const BrainIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M32 8C22 8 14 15 14 24c0 4 1.5 7.5 4 10-2 1.5-3 4-3 6.5 0 5 4 9 9 9
         1 0 2-.2 3-.5C28 51 30 52 32 52s4-1 5-3c1 .3 2 .5 3 .5 5 0 9-4 9-9
         0-2.5-1-5-3-6.5 2.5-2.5 4-6 4-10 0-9-8-16-18-16z"
      stroke="url(#g1)" strokeWidth="2" strokeLinejoin="round" fill="url(#g2)"
    />
    <path d="M32 20v12M26 26l6-6 6 6" stroke="#93c5fd" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="34" r="2" fill="#60a5fa" opacity="0.6" />
    <circle cx="40" cy="34" r="2" fill="#60a5fa" opacity="0.6" />
    <defs>
      <linearGradient id="g1" x1="14" y1="8" x2="50" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="g2" x1="14" y1="8" x2="50" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" stopOpacity="0.4" />
        <stop offset="1" stopColor="#1e40af" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Feature card ───────────────────────────────────────────────────────────
interface FeatureProps { icon: React.ReactNode; title: string; desc: string }
const FeatureCard: FC<FeatureProps> = ({ icon, title, desc }) => (
  <div className="rounded-2xl p-6 bg-blue-950/30 border border-blue-900/40
                  hover:border-blue-500/50 hover:bg-blue-950/50
                  transition-all duration-300 hover:-translate-y-1
                  backdrop-blur-sm">
    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/25
                    flex items-center justify-center mb-4 text-blue-400">
      {icon}
    </div>
    <h3 className="text-white font-bold text-sm mb-1.5 tracking-tight">{title}</h3>
    <p className="text-blue-400/55 text-xs leading-relaxed">{desc}</p>
  </div>
);

// ── Stat pill ──────────────────────────────────────────────────────────────
const StatPill: FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center px-6 py-3 rounded-2xl
                  bg-blue-950/40 border border-blue-800/30 backdrop-blur-sm">
    <span className="text-white font-extrabold text-xl tracking-tight">{value}</span>
    <span className="text-blue-400/60 text-xs mt-0.5">{label}</span>
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────
export const LandingPage: FC = () => {
  const navigate = useNavigate();
  const word     = useTypewriter();
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#050d1a] overflow-x-hidden relative">

      {/* ── Ambient background blobs ── */}
      <div className="absolute top-[-160px] left-[-120px] w-[520px] h-[520px]
                      bg-blue-800/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-80px] w-[420px] h-[420px]
                      bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[350px] bg-blue-950/50 rounded-full blur-[80px]
                      pointer-events-none" />

      {/* ── Constellation ── */}
      <StarCanvas />

      {/* ── NAV ── */}
      <nav className="relative z-20 flex items-center justify-between
                      px-5 sm:px-12 py-4 border-b border-blue-900/20
                      backdrop-blur-xl bg-[#050d1a]/60">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30
                          flex items-center justify-center
                          shadow-[0_0_18px_rgba(59,130,246,0.3)]">
            <BrainIcon className="w-5 h-5" />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">Brainly</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/20
                           border border-blue-500/30 text-blue-300 font-semibold
                           uppercase tracking-widest">
            Beta
          </span>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/signin")}
            className="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-blue-950/50 border border-blue-800/40 text-blue-400
                       hover:bg-blue-900/40 hover:border-blue-500/50 hover:text-blue-200
                       transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-blue-600 hover:bg-blue-500 text-white
                       border border-blue-500/40
                       shadow-[0_0_20px_rgba(59,130,246,0.35)]
                       hover:shadow-[0_0_28px_rgba(96,165,250,0.5)]
                       transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 flex flex-col items-center text-center
                          px-4 pt-20 sm:pt-28 pb-12">

        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
                        bg-blue-950/60 border border-blue-700/40 text-blue-300
                        text-xs font-medium backdrop-blur-md
                        hover:border-blue-500/60 transition-all cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Introducing Brainly : second brain
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor"
               strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white
                       leading-[1.06] tracking-tight mb-6 max-w-4xl
                       [text-shadow:0_0_60px_rgba(96,165,250,0.3)]">
          Save Every{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-blue-400 to-blue-200">
              {word}
            </span>
            <span
              className={`inline-block w-[3px] h-[0.82em] bg-blue-400 align-middle ml-1
                          rounded-sm transition-opacity duration-75
                          ${blink ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <br />
          <span className="text-white">to Your Second Brain</span>
        </h1>

        {/* Subtext */}
        <p className="text-blue-400/65 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
          Brainly is your personal knowledge vault — capture tweets, links,
          YouTube videos and documents in one beautifully organised space.
          Recall anything, instantly.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold
                       bg-blue-600 hover:bg-blue-500 text-white
                       border border-blue-500/40
                       shadow-[0_0_28px_rgba(59,130,246,0.4)]
                       hover:shadow-[0_0_40px_rgba(96,165,250,0.55)]
                       transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Start for free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"
                 viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold
                       bg-blue-950/50 border border-blue-800/40 text-blue-400
                       hover:bg-blue-900/40 hover:border-blue-500/50 hover:text-blue-200
                       transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Sign in to your brain
          </button>
        </div>

        {/* Content type pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-20">
          {[
            {
              label: "Twitter",
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              ),
            },
            {
              label: "YouTube",
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              ),
            },
            {
              label: "Links",
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              ),
            },
            {
              label: "Documents",
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-blue-950/60 border border-blue-800/40 text-blue-300
                         text-xs font-medium backdrop-blur-md"
            >
              <span className="text-blue-400">{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* ── Brain orb ── */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-24">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping
                          [animation-duration:3s]" />
          <div className="absolute inset-6 rounded-full border border-blue-600/15 animate-ping
                          [animation-duration:3s] [animation-delay:.6s]" />

          {/* Core glass */}
          <div className="absolute inset-10 rounded-full
                          bg-blue-950/80 border border-blue-500/30
                          flex items-center justify-center
                          shadow-[0_0_50px_rgba(59,130,246,0.4),inset_0_0_30px_rgba(37,99,235,0.15)]">
            <BrainIcon className="w-16 h-16 sm:w-20 sm:h-20
                                   drop-shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
          </div>

          {/* Orbiting dot 1 */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin [animation-duration:9s]">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-0 w-2.5 h-2.5 rounded-full bg-blue-500
                              shadow-[0_0_10px_rgba(59,130,246,0.9)] -translate-y-1/2" />
            </div>
          </div>

          {/* Orbiting dot 2 */}
          <div className="absolute inset-4 flex items-center justify-center animate-spin
                          [animation-duration:14s] [animation-direction:reverse]">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-blue-300
                              shadow-[0_0_8px_rgba(147,197,253,0.8)] -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
          <StatPill value="100+" label="Items saved" />
          <StatPill value="4"    label="Content types" />
          <StatPill value="1-click" label="Share your brain" />
        </div>

        {/* ── Feature cards ── */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Capture Instantly",
              desc: "Save anything from the web in one click — no friction, just save.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              ),
            },
            {
              title: "Organised by Type",
              desc: "Tweets, videos, links and docs — automatically sorted into clean sections.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 10h16M4 14h8" />
                </svg>
              ),
            },
            {
              title: "Share Your Brain",
              desc: "One click generates a public link to share your curated knowledge.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                </svg>
              ),
            },
            {
              title: "Private & Secure",
              desc: "Token-based auth. Your knowledge stays yours, always.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
            },
          ].map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <div className="relative rounded-3xl px-8 sm:px-16 py-12 max-w-2xl w-full
                        bg-gradient-to-br from-blue-950/60 to-[#060f20]/80
                        border border-blue-800/30 backdrop-blur-xl
                        shadow-[0_32px_80px_rgba(0,0,20,0.7),inset_0_1px_0_rgba(255,255,255,0.04)]">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px
                          bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <div className="w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/25
                          flex items-center justify-center mx-auto mb-6 text-blue-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            Ready to build your second brain?
          </h2>
          <p className="text-blue-400/55 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Join thousands of curious minds capturing what matters.
            Free forever, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold
                         bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/40
                         shadow-[0_0_24px_rgba(59,130,246,0.4)]
                         hover:shadow-[0_0_36px_rgba(96,165,250,0.55)]
                         transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Create free account
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold
                         bg-blue-950/50 border border-blue-800/40 text-blue-400
                         hover:bg-blue-900/40 hover:border-blue-500/50 hover:text-blue-200
                         transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 text-center pb-8 text-blue-900/50 text-xs">
        © {new Date().getFullYear()} Brainly : Powered By- <a href="https://shubhamvishwakarma.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300"> Shubham Vishwakarma</a>
      </footer>
    </div>
  );
};

export default LandingPage;