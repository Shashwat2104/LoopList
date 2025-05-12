import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "./animated-container";

export interface AnimatedListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: React.ReactNode[];
  variant?:
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn";
  staggerDelay?: number;
  baseDelay?: number;
  itemClassName?: string;
  containerAs?: "ul" | "ol" | "div";
}

/**
 * An animated list component that staggers the animation of its items
 */
export function AnimatedList({
  items,
  variant = "fadeInUp",
  staggerDelay = 50,
  baseDelay = 100,
  className,
  itemClassName,
  containerAs = "ul",
  ...props
}: AnimatedListProps) {
  const Container = containerAs;

  return (
    <Container className={cn("list-none", className)} {...props}>
      {items.map((item, index) => (
        <AnimatedContainer
          key={index}
          variant={variant}
          delay="none" // We'll handle delay via style
          duration="normal"
          className={itemClassName}
          style={{ animationDelay: `${baseDelay + index * staggerDelay}ms` }}
        >
          {containerAs === "ul" || containerAs === "ol" ? (
            <li>{item}</li>
          ) : (
            item
          )}
        </AnimatedContainer>
      ))}
    </Container>
  );
}

/**
 * An animated grid component that staggers the animation of its items
 */
export function AnimatedGrid({
  items,
  variant = "fadeIn",
  staggerDelay = 50,
  baseDelay = 100,
  className,
  itemClassName,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  ...props
}: Omit<AnimatedListProps, "containerAs"> & {
  gridClassName?: string;
}) {
  return (
    <div className={cn(gridClassName, className)} {...props}>
      {items.map((item, index) => (
        <AnimatedContainer
          key={index}
          variant={variant}
          delay="none" // We'll handle delay via style
          duration="normal"
          className={itemClassName}
          style={{ animationDelay: `${baseDelay + index * staggerDelay}ms` }}
        >
          {item}
        </AnimatedContainer>
      ))}
    </div>
  );
}

export default AnimatedList;
