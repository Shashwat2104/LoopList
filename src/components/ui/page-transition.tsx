import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatedContainer } from "./animated-container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getEasingFunction } from "@/lib/animation";

// Enhanced page transition component using Framer Motion
export function PageTransition({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className={cn("w-full", className)}
        style={{ willChange: "opacity, transform" }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Component transitions with different entrance animations
export function SimplePageTransition({
  children,
  variant = "fadeIn",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?:
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "scaleIn"
    | "slideInLeft"
    | "slideInRight";
  className?: string;
}) {
  // Configure different animation variants
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    },
    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={variants[variant].initial}
        animate={variants[variant].animate}
        exit={variants[variant].exit}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={className}
        style={{ willChange: "opacity, transform" }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
