import React from "react";
import { cn } from "@/lib/utils";
import { getAnimationClasses, getEasingCss } from "@/lib/animation";
import { motion } from "framer-motion";

export interface AnimatedContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
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
  delay?: "none" | "small" | "medium" | "large";
  duration?: "fast" | "normal" | "slow";
  children: React.ReactNode;
}

/**
 * A container component that applies animations to its children
 * Enhanced with Framer Motion for smoother animations
 */
export function AnimatedContainer({
  children,
  variant = "fadeIn",
  delay = "none",
  duration = "normal",
  className,
  ...props
}: AnimatedContainerProps) {
  // For non-continuous animations, use Framer Motion
  const isContinuous = ["bounce", "pulse", "spin"].includes(variant);

  if (isContinuous) {
    // Use Tailwind classes for continuous animations
    const animationClasses = getAnimationClasses({
      variant,
      delay,
      duration,
    });

    return (
      <div className={cn(animationClasses, className)} {...props}>
        {children}
      </div>
    );
  }

  // Calculate delay in ms
  const getDelayMs = () => {
    switch (delay) {
      case "small":
        return 100;
      case "medium":
        return 200;
      case "large":
        return 400;
      default:
        return 0;
    }
  };

  // Get duration in seconds
  const getDurationSec = () => {
    switch (duration) {
      case "fast":
        return 0.3;
      case "slow":
        return 0.6;
      default:
        return 0.4;
    }
  };

  // Configure variants for Framer Motion
  const getVariants = () => {
    const commonProps = {
      opacity: 0,
      transition: {
        duration: getDurationSec(),
        ease: "easeOut",
        delay: getDelayMs() / 1000,
      },
    };

    // Animation variants
    switch (variant) {
      case "fadeIn":
        return {
          hidden: { ...commonProps },
          visible: { opacity: 1 },
        };
      case "fadeInUp":
        return {
          hidden: { ...commonProps, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeInDown":
        return {
          hidden: { ...commonProps, y: -20 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeInLeft":
        return {
          hidden: { ...commonProps, x: -20 },
          visible: { opacity: 1, x: 0 },
        };
      case "fadeInRight":
        return {
          hidden: { ...commonProps, x: 20 },
          visible: { opacity: 1, x: 0 },
        };
      case "scaleIn":
        return {
          hidden: { ...commonProps, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "slideInLeft":
        return {
          hidden: { ...commonProps, x: -40 },
          visible: { opacity: 1, x: 0 },
        };
      case "slideInRight":
        return {
          hidden: { ...commonProps, x: 40 },
          visible: { opacity: 1, x: 0 },
        };
      case "slideInUp":
        return {
          hidden: { ...commonProps, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
      case "slideInDown":
        return {
          hidden: { ...commonProps, y: -40 },
          visible: { opacity: 1, y: 0 },
        };
      default:
        return {
          hidden: { ...commonProps },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      style={{ willChange: "opacity, transform" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A component that staggers the animation of its children
 * Enhanced with Framer Motion for smoother animations
 */
export function StaggeredContainer({
  children,
  baseDelay = 75,
  delayIncrement = 40,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  baseDelay?: number;
  delayIncrement?: number;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        return (
          <motion.div
            key={child.key || index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: (baseDelay + index * delayIncrement) / 1000,
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
            }}
            style={{ willChange: "opacity, transform" }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default AnimatedContainer;
