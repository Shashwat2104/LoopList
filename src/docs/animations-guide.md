# Animation System Guide

This project includes a comprehensive animation system built on top of Tailwind CSS and React, allowing you to easily add beautiful animations to your components.

## Available Components

### 1. AnimatedContainer

Wrap any content with animation effects:

```tsx
import { AnimatedContainer } from "@/components/ui/animated-container";

<AnimatedContainer
  variant="fadeInUp"
  delay="small"
  duration="normal"
  className="p-4 bg-white rounded-lg"
>
  <h2>Animated Content</h2>
  <p>This content animates in with a fade-up effect</p>
</AnimatedContainer>;
```

### 2. AnimatedList

Create lists with staggered item animations:

```tsx
import { AnimatedList } from "@/components/ui/animated-list";

const items = ["Item 1", "Item 2", "Item 3"];

<AnimatedList
  items={items.map((item) => (
    <div>{item}</div>
  ))}
  variant="fadeInLeft"
  staggerDelay={75}
  baseDelay={100}
  containerAs="ul" // 'ul', 'ol', or 'div'
/>;
```

### 3. AnimatedGrid

Create grids with staggered animations:

```tsx
import { AnimatedGrid } from "@/components/ui/animated-list";

<AnimatedGrid
  items={cardItems}
  variant="fadeIn"
  staggerDelay={100}
  gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
/>;
```

### 4. PageTransition

Smooth transitions between pages:

```tsx
import { PageTransition } from "@/components/ui/page-transition";

<PageTransition>
  <YourPageContent />
</PageTransition>;
```

## Animation Variants

The following animation variants are available:

- **Fade Animations**:

  - `fadeIn`: Simple fade in
  - `fadeInUp`: Fade in while moving up
  - `fadeInDown`: Fade in while moving down
  - `fadeInLeft`: Fade in while moving from left
  - `fadeInRight`: Fade in while moving from right

- **Scale Animations**:

  - `scaleIn`: Fade in while scaling up slightly

- **Slide Animations**:

  - `slideInLeft`: Slide in from left
  - `slideInRight`: Slide in from right
  - `slideInUp`: Slide in from bottom
  - `slideInDown`: Slide in from top

- **Continuous Animations**:
  - `bounce`: Continuous bouncing
  - `pulse`: Continuous pulsing
  - `spin`: Continuous spinning

## Timing Options

### Delays

- `none`: No delay (0ms)
- `small`: Short delay (150ms)
- `medium`: Medium delay (300ms)
- `large`: Long delay (500ms)

### Durations

- `fast`: Fast animation (300ms)
- `normal`: Normal animation (500ms)
- `slow`: Slow animation (700ms)

## Utility Functions

### getAnimationClasses

Get Tailwind animation classes:

```tsx
import { getAnimationClasses } from "@/lib/animation";

const classes = getAnimationClasses({
  variant: "fadeInUp",
  delay: "small",
  duration: "normal",
});
```

### withAnimation

Higher-order component to add animations to existing components:

```tsx
import { withAnimation } from "@/lib/animation";
import { Card } from "@/components/ui/card";

const AnimatedCard = withAnimation(Card, {
  variant: "fadeIn",
  duration: "normal",
});

// Use it like a normal Card component
<AnimatedCard>Content</AnimatedCard>;
```

### createStaggeredChildren

Create staggered delays for children:

```tsx
import { createStaggeredChildren } from "@/lib/animation";

const getDelay = createStaggeredChildren(100, 50);

// In your component
{
  items.map((item, index) => (
    <div style={{ animationDelay: `${getDelay(index)}ms` }}>{item}</div>
  ));
}
```

## Example Component

Check out the `src/components/examples/AnimationDemo.tsx` file for a complete example showcasing different animation types and options.

## Using with Toast Notifications

Our toast system also supports animations. See the toast documentation for more details.
