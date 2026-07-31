"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/**
 * Center-focused ("coverflow") testimonial carousel with continuous looping.
 *
 * The active testimonial sits centered and full-strength; its neighbours peek
 * in on each side, dimmed and scaled down. Cards are positioned on a ring by
 * their circular distance from the active index, so advancing past the last
 * item wraps seamlessly back to the first — there's always a card on both
 * sides. Autoplays gently and pauses on hover. Arrows/dots move the focus,
 * and clicking a side card brings it to center. Data shape matches
 * app/page.tsx ({ quote, name, role }).
 */

type Testimonial = { quote: string; name: string; role: string };

const AUTOPLAY_MS = 4500;

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState({ height: 0, spacing: 0 });
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Circular distance from the active card, in range [-count/2, count/2].
  const relativeIndex = (i: number) => {
    let rel = i - active;
    if (rel > count / 2) rel -= count;
    if (rel < -count / 2) rel += count;
    return rel;
  };

  const measure = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;
    const height = Math.max(...cards.map((c) => c.offsetHeight));
    const spacing = (cardRefs.current[active]?.offsetWidth ?? cards[0].offsetWidth) * 1.1;
    setDims({ height, spacing });
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Gentle continuous autoplay; resets on any manual move, pauses on hover.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count, active]);

  const go = (n: number) => setActive((n + count) % count);

  return (
    <div className="mt-10">
      <div
        className="relative min-h-[15rem] overflow-hidden"
        style={dims.height ? { height: dims.height } : undefined}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {testimonials.map((t, i) => {
          const rel = relativeIndex(i);
          const isActive = rel === 0;
          const isNeighbor = Math.abs(rel) === 1;
          const scale = isActive ? 1 : isNeighbor ? 0.9 : 0.8;
          const opacity = isActive ? 1 : isNeighbor ? 0.45 : 0;
          return (
            <figure
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => isNeighbor && setActive(i)}
              style={{
                transform: `translate(-50%, -50%) translateX(${rel * dims.spacing}px) scale(${scale})`,
                opacity,
                zIndex: 20 - Math.abs(rel),
                pointerEvents: isActive || isNeighbor ? "auto" : "none",
              }}
              className={`absolute left-1/2 top-1/2 w-[82%] rounded-xl border bg-navy-700 p-5 transition-all duration-500 ease-out sm:w-[56%] lg:w-[40%] ${
                isActive
                  ? "border-white/15 shadow-2xl"
                  : "cursor-pointer border-white/10 hover:opacity-70"
              }`}
            >
              <Quote className="mb-3 h-5 w-5 text-crimson" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-navy-100">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-white/10 pt-4">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="mt-0.5 text-xs text-navy-200">{t.role}</div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {testimonials.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-crimson" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
