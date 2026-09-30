import Image from "next/image";
import SkillsMarquee from "./SkillsMarquee";
import AboutTerminal from "./AboutTerminal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { about } from "@/lib/content";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-bg" aria-label="About">
      <SkillsMarquee />

      {/* Below lg the column wrappers dissolve (`contents`) and `order-*` sets the stacking. */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:gap-12 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16 xl:px-10">
        {/* Left — terminal */}
        <div className="min-w-0 space-y-4 max-lg:contents">
          <div className="order-2 min-w-0">
            <AboutTerminal />
          </div>
          <ScrollReveal delay={0.12} className="order-4">
            <Image
              src="/images/UTHM.webp"
              alt="Universiti Tun Hussein Onn Malaysia (UTHM)"
              width={860}
              height={484}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-xl border border-line object-cover"
            />
          </ScrollReveal>
        </div>

        {/* Right — info */}
        <div className="flex flex-col max-lg:contents">
          <div className="order-1">
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
          </div>

          <ScrollReveal delay={0.24} as="ul" className="order-3 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:mt-10">
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
