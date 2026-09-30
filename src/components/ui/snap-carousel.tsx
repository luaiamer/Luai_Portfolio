"use client";

import { useRef, useState } from "react";

/**
 * State for a horizontal scroll-snap track. Attach `trackRef` and `onScroll`
 * to the scrolling element; its direct children are treated as the slides.
 */
export function useSnapCarousel<T extends HTMLElement = HTMLElement>() {
  const trackRef = useRef<T>(null);
  const [active, setActive] = useState(0);

  const slideScrollLeft = (track: HTMLElement, slide: HTMLElement) =>
    slide.offsetLeft - parseFloat(getComputedStyle(track).scrollPaddingLeft || "0");

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const distances = slides.map((slide) =>
      Math.abs(slideScrollLeft(track, slide) - track.scrollLeft),
    );
    setActive(distances.indexOf(Math.min(...distances)));
  };

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slideScrollLeft(track, slide), behavior: "smooth" });
  };

  return { trackRef, active, onScroll, scrollTo };
}

type CarouselDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  label?: string;
  className?: string;
};

export function CarouselDots({
  count,
  active,
  onSelect,
  label = "item",
  className = "",
}: CarouselDotsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Show ${label} ${index + 1}`}
          aria-current={active === index ? "true" : undefined}
          className={`h-2 rounded-full transition-all ${
            active === index ? "w-6 bg-accent" : "w-2 bg-line"
          }`}
        />
      ))}
    </div>
  );
}

/** Classes that turn a flex row into an edge-to-edge snap track below lg. */
export const snapTrackClass =
  "max-lg:-mx-6 max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-6 max-lg:overflow-x-auto max-lg:px-6 max-lg:pb-2 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden md:max-lg:-mx-8 md:max-lg:scroll-px-8 md:max-lg:px-8";
