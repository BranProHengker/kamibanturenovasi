"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
}

export default function TextReveal({ text, className = "", as: Tag = "p" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".text-reveal-char");

    gsap.set(chars, { opacity: 0.12 });

    const tl = gsap.to(chars, {
      opacity: 1,
      stagger: 0.02,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <span key={ci} className="text-reveal-char">
                {char}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </div>
  );
}
