# Portfolio Homepage — Build Spec (Hero Section)

> **For the AI agent reading this:** You are building the homepage hero of a personal portfolio with a cyber-security / hacker aesthetic. Follow this spec closely. Where something is marked **[PLACEHOLDER]**, keep it data-driven so the owner can swap in real content later. Do not invent extra sections — this task is the hero only (plus the navbar).

---

## 1. Goal

A full-viewport, dark hero section with:

1. A **Matrix-style background**: `0` and `1` characters falling vertically, drawn on a `<canvas>`.
2. A **large portrait image** in the center, sitting above the background and fading into it at the bottom.
3. **Left column**: greeting, name, role/subtitle, short description, two buttons, location line.
4. **Right column**: three stacked metrics (big number + small label).
5. A **top navbar**: logo left, pill-shaped nav center, primary CTA right.

The overall feel: black background, neon lime-green accent, monospace details, subtle grid and "network" lines — clean and premium, not noisy.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 14+ (App Router)** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** (use CSS variables for theme tokens) |
| Animation | **Framer Motion** for entrance/count-up; raw **Canvas 2D API** for the matrix rain |
| Images | `next/image` |
| Fonts | `next/font/google` |

No UI kit is required. Keep components small and typed.

---

## 3. File Structure

```
app/
  layout.tsx            // fonts, <body> bg, metadata
  page.tsx              // renders <Navbar /> + <Hero />
  globals.css           // Tailwind + CSS variables
components/
  layout/
    Navbar.tsx
  hero/
    Hero.tsx            // composes everything below
    MatrixRain.tsx      // "use client" canvas background
    GridOverlay.tsx     // faint grid + watermark text
    HeroIntro.tsx       // left column
    HeroPortrait.tsx    // center image
    HeroMetrics.tsx     // right column
    CountUp.tsx         // animated number
    ScrambleText.tsx    // optional "decrypt" text effect
lib/
  content.ts            // ALL copy, links, metrics live here
public/
  images/portrait.png   // [PLACEHOLDER] transparent-background PNG
  resume.pdf            // [PLACEHOLDER]
```

---

## 4. Design Tokens

Define in `globals.css` as CSS variables and expose them in `tailwind.config.ts`.

```css
:root {
  --bg:            #000000;   /* pure black page background */
  --bg-elevated:   #0A0F0A;   /* nav pill, secondary button */
  --accent:        #C6F432;   /* neon lime — primary accent */
  --accent-glow:   rgba(198, 244, 50, 0.35);
  --accent-2:      #22D3EE;   /* cyan — used once (3rd metric) */
  --text:          #FFFFFF;
  --text-muted:    #A1A1AA;
  --text-dim:      #52525B;   /* labels, watermark strokes */
  --line:          rgba(255, 255, 255, 0.08); /* borders, grid */
  --matrix:        #3FAF4A;   /* falling digits base color */
}
```

### Typography

| Role | Font | Notes |
|---|---|---|
| Display (name, big numbers) | **Space Grotesk** or **Archivo** (700–800) | Tight tracking (`-0.02em`), line-height ~0.95 |
| Greeting ("Hello, I'm") | **Caveat** or **Permanent Marker** | Handwritten, accent color, slight rotation (-4deg) |
| Body | **Inter** or **Manrope** (400) | 16–18px, line-height 1.6, max-width ~46ch |
| Mono (labels, metrics captions, status) | **JetBrains Mono** or **IBM Plex Mono** | 11–12px, uppercase, `letter-spacing: 0.15em` |

---

## 5. Layout

Desktop (≥1280px), full viewport height (`min-h-screen`), content max-width ~1440px, centered.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [>_] Logo           ( About  Expertise  Work  Arsenal )        [Hire Me] │
│ ROLE LABEL                                        AVAILABLE FOR WORK ●   │
│                                                                          │
│           Hello, I'm             ┌────────────┐                          │
│           FIRST                  │            │               12+        │
│           LAST (accent)          │  PORTRAIT  │          YEARS EXP       │
│                                  │  (center,  │                          │
│           SUBTITLE LINE 1        │  overlaps  │               500+       │
│           SUBTITLE LINE 2        │  both      │          PEN TESTS       │
│           Description…           │  columns)  │                          │
│                                  │            │               40+        │
│           [View My Work →] [Download Resume]  │          CVEs            │
│           ● AVAILABLE WORLDWIDE · CITY        │                          │
│ ── SCROLL TO DECRYPT             └────────────┘                          │
└──────────────────────────────────────────────────────────────────────────┘
         ▲ behind everything: MatrixRain canvas + grid + "PORTFOLIO" watermark
```

### Layering (z-index, bottom → top)

| z | Layer |
|---|---|
| 0 | `MatrixRain` canvas (absolute, inset-0) |
| 1 | `GridOverlay`: faint grid lines + giant outlined `PORTFOLIO` watermark + decorative network lines |
| 2 | Radial glow blobs (lime bottom-left, teal behind portrait) |
| 3 | `HeroPortrait` |
| 4 | `HeroIntro` (left) and `HeroMetrics` (right) — text must sit **above** the portrait |
| 50 | `Navbar` (fixed/sticky) |

Use a 12-column CSS grid: intro = cols 1–5, portrait = cols 5–9 (absolutely positioned / overlapping), metrics = cols 10–12 right-aligned.

---

## 6. Component Specs

### 6.1 `MatrixRain.tsx` (most important)

`"use client"` component rendering a `<canvas>` that fills the hero.

**Behaviour**
- Characters are only `0` and `1`.
- The screen is divided into columns (`columnWidth = fontSize`, e.g. 14–16px).
- Each column has a "drop" with its own `y` position and speed (randomized, e.g. 0.3–1.2 rows/frame scaled by delta time).
- Each frame: paint a translucent black rect over the whole canvas (`rgba(0,0,0,0.08)`) to create fading trails, then draw each drop's glyph.
- The **head** glyph of each drop is brighter (near-white green `#D9FFD0`), the trail is `--matrix` fading out.
- When a drop passes the bottom, reset it to the top with a random delay so the rain feels uneven, not a uniform curtain.
- **Density must be sparse** — like the reference, only ~25–40% of columns active at once. Expose a `density` prop (0–1, default `0.3`).
- Overall canvas `opacity: 0.35–0.5` so it never competes with the text.

**Props**
```ts
type MatrixRainProps = {
  fontSize?: number;      // default 14
  density?: number;       // default 0.3
  speed?: number;         // multiplier, default 1
  color?: string;         // default var(--matrix)
  className?: string;
};
```

**Technical requirements**
- Use `requestAnimationFrame`; cancel it on unmount.
- Handle `devicePixelRatio` (scale canvas for crisp text on retina).
- Recompute columns on resize (debounced ~150ms, use `ResizeObserver`).
- Pause the loop when the tab is hidden (`document.visibilitychange`) and when the hero is scrolled out of view (`IntersectionObserver`).
- **`prefers-reduced-motion: reduce`** → render one static frame of scattered digits and do not animate.
- Target 60fps; cap at ~30fps on mobile if needed. No per-frame allocations inside the loop.
- `aria-hidden="true"` and `pointer-events: none`.

### 6.2 `GridOverlay.tsx`
- Subtle square grid (~80px cells) using `--line`, masked with a radial gradient so it fades toward the edges.
- Giant `PORTFOLIO` watermark behind the portrait: display font, ~22vw, `color: transparent`, `-webkit-text-stroke: 1px var(--text-dim)`, opacity ~0.25.
- A few thin decorative "network" lines with small nodes on the upper right (SVG), plus one small ring target (circle with a dot). Static or very slow drift.

### 6.3 `HeroIntro.tsx` (left column)
From top to bottom:
1. **Greeting** — handwritten font, accent color: `Hello, I'm`.
2. **Name** — two lines, display font, ~96–120px desktop. First name white, last name in `--accent`.
3. **Subtitle** — 2 lines, uppercase, bold, accent color, ~20px (e.g. "ETHICAL HACKER & / OFFENSIVE SECURITY ENGINEER").
4. **Description** — muted body text, max ~46ch.
5. **Buttons** (gap 16px):
   - **Primary**: "View My Work" + arrow icon. Pill, `bg-[--accent]`, black text, soft outer glow `box-shadow: 0 0 30px var(--accent-glow)`. Hover: glow intensifies, arrow nudges right 4px. Links to `#work`.
   - **Secondary**: "Download Resume". Pill, transparent/`--bg-elevated`, 1px `--line` border, white text. Hover: border turns accent. `href="/resume.pdf" download`.
6. **Status line** — mono, dim: pulsing green dot + `AVAILABLE WORLDWIDE · CITY, COUNTRY`.

### 6.4 `HeroPortrait.tsx`
- `next/image` with `priority`, transparent PNG, roughly 55–60% of viewport height, horizontally centered, anchored to the bottom of the hero.
- Bottom fade into black: `mask-image: linear-gradient(to bottom, black 70%, transparent 100%)`.
- Rim light: a teal radial glow behind the right shoulder, a lime glow on the left side.
- Small floating badge near the shoulder: pill with accent border, mono text `✦ subject_verified`, gentle float animation (±4px, 4s loop).

### 6.5 `HeroMetrics.tsx` (right column)
- Three stacked items, right-aligned, ~80px vertical gap.
- Number: display font ~64px, with a `+` suffix. Colors: 1st accent, 2nd white, 3rd `--accent-2` (cyan).
- Label: mono, 11px, uppercase, `--text-muted`, 2 lines max.
- Numbers **count up** from 0 when they enter the viewport (`CountUp.tsx`, ~1.5s, ease-out). Reduced motion → show final value instantly.
- Above the metrics, top-right: `AVAILABLE FOR ENGAGEMENTS ●` in mono with a pulsing accent dot.

### 6.6 `Navbar.tsx`
- **Left**: logo tile (rounded square, dark green bg, `>_` in accent) + name "CSume"-style wordmark with a tiny mono sub-label. **[PLACEHOLDER]**
- **Center**: pill container (`--bg-elevated`, 1px `--line` border, backdrop blur) with links: About, Expertise, Work, Arsenal. Hover: text turns white/accent.
- **Right**: "Hire Me" pill button — same style as the primary hero button. Links to `#contact` or `mailto:`.
- Sticky, transparent at top; after scrolling 20px add `bg-black/60 backdrop-blur`.
- Mobile: center pill collapses into a hamburger → full-screen overlay menu.

### 6.7 Corner details
- Top-left under the logo: 2-line mono label (accent line 1, muted line 2), e.g. `ETHICAL HACKER / SECURITY EXPERT`.
- Bottom-left: short horizontal line + `SCROLL TO DECRYPT` in mono; clicking scrolls to the next section.

---

## 7. Motion (one orchestrated load sequence)

On first load, run **one** staggered sequence (Framer Motion), total ≤ 1.4s:

1. Matrix rain fades in (0 → full opacity, 600ms).
2. Portrait fades up (y: 24 → 0).
3. Left column items stagger in (60ms each).
4. Metrics count up.

Optional: `ScrambleText` on the name — letters cycle through random `0/1/A–Z` characters for ~600ms before resolving ("decrypt" effect). Run once only.

Everything above must be disabled or reduced to simple fades under `prefers-reduced-motion`.

---

## 8. Content (`lib/content.ts`)

All text lives here — components must not hardcode copy.

```ts
export const hero = {
  greeting: "Hello, I'm",
  firstName: "FIRST",                       // [PLACEHOLDER]
  lastName: "LAST",                         // [PLACEHOLDER]
  subtitle: ["ETHICAL HACKER &", "OFFENSIVE SECURITY ENGINEER"], // [PLACEHOLDER]
  description:
    "Short 2–3 sentence intro about what you do and who you do it for.", // [PLACEHOLDER]
  location: "AVAILABLE WORLDWIDE · CITY, COUNTRY", // [PLACEHOLDER]
  cornerLabel: ["ETHICAL HACKER", "SECURITY EXPERT"],  // [PLACEHOLDER]
  primaryCta: { label: "View My Work", href: "#work" },
  secondaryCta: { label: "Download Resume", href: "/resume.pdf" },
  portrait: { src: "/images/portrait.png", alt: "Portrait of FIRST LAST" },
  badge: "subject_verified",
};

export const metrics = [
  { value: 12,  suffix: "+", label: "Years experience",  color: "accent" },
  { value: 500, suffix: "+", label: "Penetration tests", color: "white"  },
  { value: 40,  suffix: "+", label: "CVEs disclosed",    color: "cyan"   },
]; // [PLACEHOLDER]

export const nav = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Arsenal", href: "#arsenal" },
];
```

---

## 9. Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| **≥1280px** | As in the wireframe: intro left, portrait center, metrics right. |
| **768–1279px** | Intro left, portrait right (smaller). Metrics move below as a 3-column row. |
| **<768px** | Single column: intro → portrait (max 60vh) → metrics as 3 small columns. Name ~56px. Buttons full width, stacked. Hide watermark and network lines. Matrix `density` drops to ~0.2 and `fontSize` to 12. |

No horizontal scroll at any width.

---

## 10. Accessibility & Quality

- One `<h1>` = the full name. Subtitle is a `<p>` or `<h2>`.
- All decorative layers (`canvas`, grid, watermark, glows, badge) are `aria-hidden`.
- Visible keyboard focus ring on all links/buttons (accent outline, 2px offset).
- Text contrast ≥ 4.5:1 against the background (check muted body text over the rain).
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95.
- The portrait uses `priority`; fonts use `display: swap`.

---

## 11. Acceptance Checklist

- [ ] `0`/`1` digits fall continuously, sparsely, with fading trails, behind all content.
- [ ] Rain pauses when the tab is hidden and respects reduced motion.
- [ ] Canvas is crisp on retina and re-lays out correctly on resize.
- [ ] Portrait is centered, overlaps both columns, and fades into black at the bottom.
- [ ] Left column: greeting, two-line name (last name accent), subtitle, description, two buttons, status line.
- [ ] Right column: three metrics that count up on view.
- [ ] Navbar with logo, pill nav, and "Hire Me" CTA; becomes blurred on scroll; mobile menu works.
- [ ] All copy comes from `lib/content.ts`.
- [ ] Looks correct at 375px, 768px, 1280px, and 1920px widths.
- [ ] No console errors, no hydration warnings (canvas logic runs only in `useEffect`).

---

## 12. Out of Scope (for now)

About, Expertise, Work, Arsenal, and Contact sections — only create empty anchored `<section id="...">` placeholders so nav links scroll somewhere.
