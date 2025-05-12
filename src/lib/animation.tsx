import React from "react";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideInDown"
  | "bounce"
  | "pulse"
  | "spin";

type AnimationDelay = "none" | "small" | "medium" | "large";
type AnimationDuration = "fast" | "normal" | "slow";
export type EasingType = "swift" | "bounce" | "elastic" | "smooth";

interface AnimationProps {
  variant?: AnimationVariant;
  delay?: AnimationDelay;
  duration?: AnimationDuration;
  className?: string;
}

/**
 * Returns Tailwind classes for animations
 */
export function getAnimationClasses({
  variant = "fadeIn",
  delay = "none",
  duration = "normal",
  className = "",
}: AnimationProps = {}) {
  // Base animation classes
  const animationClasses: Record<AnimationVariant, string> = {
    fadeIn: "animate-in fade-in",
    fadeInUp: "animate-in fade-in slide-in-from-bottom-4",
    fadeInDown: "animate-in fade-in slide-in-from-top-4",
    fadeInLeft: "animate-in fade-in slide-in-from-left-4",
    fadeInRight: "animate-in fade-in slide-in-from-right-4",
    scaleIn: "animate-in zoom-in-95",
    slideInLeft: "animate-in slide-in-from-left-8",
    slideInRight: "animate-in slide-in-from-right-8",
    slideInUp: "animate-in slide-in-from-bottom-8",
    slideInDown: "animate-in slide-in-from-top-8",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    spin: "animate-spin",
  };

  // Delay classes
  const delayClasses: Record<AnimationDelay, string> = {
    none: "delay-0",
    small: "delay-100",
    medium: "delay-200",
    large: "delay-400",
  };

  // Duration classes - optimized for smoother animations
  const durationClasses: Record<AnimationDuration, string> = {
    fast: "duration-300 ease-out",
    normal: "duration-400 ease-out",
    slow: "duration-600 ease-in-out",
  };

  return cn(
    animationClasses[variant],
    delayClasses[delay],
    durationClasses[duration],
    className
  );
}

/**
 * Animation component that wraps children with animation classes
 */
export function withAnimation<P extends object>(
  Component: React.ComponentType<P>,
  defaultAnimationProps: AnimationProps = {}
) {
  return function AnimatedComponent(props: P & AnimationProps) {
    const {
      variant = defaultAnimationProps.variant || "fadeIn",
      delay = defaultAnimationProps.delay || "none",
      duration = defaultAnimationProps.duration || "normal",
      className = "",
      ...rest
    } = props;

    const animationClasses = getAnimationClasses({
      variant,
      delay,
      duration,
    });

    return (
      <Component className={cn(animationClasses, className)} {...(rest as P)} />
    );
  };
}

/**
 * Stagger children animations with increasing delays
 */
export function createStaggeredChildren(
  baseDelay = 75,
  increment = 40
): (index: number) => number {
  return (index: number) => baseDelay + index * increment;
}

/**
 * Get CSS cubic-bezier values for easing functions
 */
export function getEasingCss(type: EasingType = "smooth"): string {
  const easings = {
    swift: "cubic-bezier(0.55, 0, 0.1, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    smooth: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  };

  return easings[type];
}

/**
 * Get Framer Motion compatible easing functions
 */
export function getEasingFunction(
  type: EasingType = "smooth"
): string | number[] {
  // Framer Motion compatible array format [x1, y1, x2, y2]
  const easings = {
    swift: [0.55, 0, 0.1, 1],
    bounce: [0.68, -0.55, 0.27, 1.55],
    elastic: [0.68, -0.6, 0.32, 1.6],
    smooth: [0.4, 0.0, 0.2, 1],
  };

  // For Framer Motion, fallback to standard easing names if needed
  const motionEasings: Record<EasingType, string | number[]> = {
    swift: easings.swift,
    bounce: "backOut",
    elastic: "anticipate",
    smooth: easings.smooth,
  };

  return motionEasings[type];
}
