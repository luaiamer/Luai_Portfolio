import SkillsMarquee from "./SkillsMarquee";
import AboutTerminal from "./AboutTerminal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { about } from "@/lib/content";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-bg" aria-label="About">
      <SkillsMarquee />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-16 md:gap-16 md:px-8 md:py-24 lg:grid-cols-2 xl:px-10">
        {/* Left — terminal */}
        <div className="min-w-0">
          <AboutTerminal />
        </div>

        {/* Right — info */}
        <div className="flex flex-col justify-center">
          <ScrollReveal
            as="p"
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {about.eyebrow}
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.08}
            className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl lg:text-[2.75rem]"
          >
            {about.headline}
          </ScrollReveal>
          <ScrollReveal
            delay={0.16}
            className="mt-6 max-w-xl space-y-4 text-justify text-base leading-relaxed text-text-muted md:text-lg"
          >
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.24} as="ul" className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
            {about.highlights.map((item) => (
              <li key={item.title}>
                <p className="font-display text-lg font-semibold text-text">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-text-muted">{item.subtitle}</p>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
