export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Faint grid, masked toward edges */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      {/* PORTFOLIO watermark */}
      <div className="absolute inset-0 hidden items-center justify-center md:flex">
        <span
          className="select-none font-display font-bold leading-none tracking-[-0.04em] text-transparent opacity-25"
          style={{
            fontSize: "clamp(4rem, 22vw, 18rem)",
            WebkitTextStroke: "1px var(--text-dim)",
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Decorative network lines — desktop only */}
      <svg
        className="absolute right-[8%] top-[18%] hidden h-48 w-64 opacity-40 lg:block"
        viewBox="0 0 260 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 40 L90 30 L140 70 L210 50"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <path
          d="M90 30 L100 100 L170 120"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <path
          d="M140 70 L160 20 L230 40"
          stroke="var(--line)"
          strokeWidth="1"
        />
        {[
          [20, 40],
          [90, 30],
          [140, 70],
          [210, 50],
          [100, 100],
          [170, 120],
          [160, 20],
          [230, 40],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--text-dim)" />
        ))}
        {/* Ring target */}
        <circle
          cx="230"
          cy="110"
          r="18"
          stroke="var(--text-dim)"
          strokeWidth="1"
        />
        <circle
          cx="230"
          cy="110"
          r="8"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="230" cy="110" r="2" fill="var(--accent)" />
      </svg>
    </div>
  );
}
