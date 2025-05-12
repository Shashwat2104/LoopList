import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  effect?: "fadeIn" | "slideUp" | "typewriter" | "staggered" | "rainbow";
  duration?: number;
  delay?: number;
  staggerAmount?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  effect = "fadeIn",
  duration = 1,
  delay = 0,
  staggerAmount = 0.05,
  tag: Tag = "div",
}) => {
  const container = useRef<HTMLDivElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!container.current) return;

    // Reset opacity and other properties to ensure animations work on re-renders
    gsap.set(chars.current, { autoAlpha: 1, y: 0, x: 0, color: "inherit" });

    const splitText = () => {
      if (!container.current) return;
      // Clear previous content
      container.current.innerHTML = "";

      // Create a span for each character
      const characters = text.split("");
      chars.current = characters.map((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
        span.style.display = "inline-block";
        span.style.position = "relative";
        container.current?.appendChild(span);
        return span;
      });
    };

    splitText();

    switch (effect) {
      case "fadeIn":
        gsap.fromTo(
          chars.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration,
            delay,
            stagger: staggerAmount,
            ease: "power2.out",
          }
        );
        break;

      case "slideUp":
        gsap.fromTo(
          chars.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            stagger: staggerAmount,
            ease: "back.out(1.7)",
          }
        );
        break;

      case "typewriter":
        gsap.set(chars.current, { autoAlpha: 0 });
        gsap.to(chars.current, {
          autoAlpha: 1,
          duration: 0.1,
          delay,
          stagger: staggerAmount,
          ease: "none",
        });
        break;

      case "staggered":
        gsap.fromTo(
          chars.current,
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration,
            delay,
            stagger: staggerAmount,
            ease: "elastic.out(1.2, 0.5)",
          }
        );
        break;

      case "rainbow":
        gsap.fromTo(
          chars.current,
          {
            autoAlpha: 0,
            y: 50,
            color: "#000000",
          },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            stagger: staggerAmount,
            ease: "power2.out",
            onComplete: () => {
              // Apply rainbow colors
              chars.current.forEach((char, i) => {
                gsap.to(char, {
                  color: `hsl(${(i * 10) % 360}, 80%, 60%)`,
                  duration: 1,
                  delay: i * 0.03,
                });
              });
            },
          }
        );
        break;
    }
  }, [text, effect, duration, delay, staggerAmount]);

  return (
    <Tag
      ref={container}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
