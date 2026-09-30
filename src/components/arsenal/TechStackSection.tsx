import { Marquee } from "@/components/ui/marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { techStack } from "@/lib/content";

type TechItem = (typeof techStack.languages)[number];

function TechChip({ item }: { item: TechItem }) {
  return (
    <div
      className="flex items-center gap-3 whitespace-nowrap"
      style={{
        borderRadius: "0.75rem",
        border: "1px solid var(--line)",
        background: "rgba(10, 15, 10, 0.55)",
        padding: "0.85rem 1.25rem",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          item.src ?? `https://cdn.simpleicons.org/${item.icon}/${item.color}`
        }
        alt=""
        width={22}
        height={22}
        className="size-[22px] shrink-0"
        loading="lazy"
        decoding="async"
      />
      <span className="font-display text-sm tracking-wide text-text md:text-base">
        {item.name}
      </span>
    </div>
  );
}

function EdgeFades() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
        style={{
          background: "linear-gradient(to right, var(--bg), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
        style={{
          background: "linear-gradient(to left, var(--bg), transparent)",
        }}
      />
    </>
  );
}

/**
 * Dual opposing marquees — languages L→R feel, frameworks the other way.
 */
export default function TechStackSection() {
  return (
    <section
      id="arsenal"
      className="relative border-t border-line bg-bg"
      aria-label="Technical stack"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:px-8 md:pt-20 xl:px-10">
        <ScrollReveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {techStack.eyebrow}
        </ScrollReveal>
        <ScrollReveal
          as="h2"
          delay={0.08}
          className="max-w-2xl font-display text-3xl font-bold tracking-tight text-text md:text-4xl"
        >
          {techStack.headline}
        </ScrollReveal>
        <ScrollReveal
          as="p"
          delay={0.16}
          className="mt-4 max-w-xl pb-10 text-base text-text-muted md:text-lg"
        >
          {techStack.description}
        </ScrollReveal>
      </div>

      <div className="relative space-y-4 pb-16 md:space-y-5 md:pb-24">
        {/* Languages — default direction */}
        <div className="relative overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem]">
            {techStack.languages.map((item) => (
              <TechChip key={item.name} item={item} />
            ))}
          </Marquee>
          <EdgeFades />
        </div>

        {/* Frameworks & DBs — opposite direction */}
        <div className="relative overflow-hidden">
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:45s] [--gap:1rem]"
          >
            {techStack.frameworks.map((item) => (
              <TechChip key={item.name} item={item} />
            ))}
          </Marquee>
          <EdgeFades />
        </div>
      </div>
    </section>
  );
}
