import { Marquee } from "@/components/ui/marquee";
import { skills } from "@/lib/content";

export default function SkillsMarquee() {
  return (
    <div className="relative border-y border-line bg-bg py-4 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:35s] [--gap:2.5rem]">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-6 whitespace-nowrap font-display text-sm tracking-wide text-text-muted md:text-base"
          >
            {skill}
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-24" />
    </div>
  );
}
