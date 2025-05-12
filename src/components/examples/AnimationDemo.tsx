import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedList, AnimatedGrid } from "@/components/ui/animated-list";
import useToast from "@/hooks/useToast";

const AnimationDemo = () => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string>("fadeIn");

  const animationVariants = [
    "fadeIn",
    "fadeInUp",
    "fadeInDown",
    "fadeInLeft",
    "fadeInRight",
    "scaleIn",
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "slideInDown",
  ];

  const demoItems = [
    "First item",
    "Second item",
    "Third item",
    "Fourth item",
    "Fifth item",
  ];

  const cardItems = Array(6)
    .fill(0)
    .map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <CardTitle>Card {i + 1}</CardTitle>
          <CardDescription>Animated card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card animates with a staggered delay.</p>
        </CardContent>
        <CardFooter>
          <Button
            size="sm"
            onClick={() =>
              toast.info(`Clicked card ${i + 1}`, {
                description: "This toast also has a nice animation!",
              })
            }
          >
            Click me
          </Button>
        </CardFooter>
      </Card>
    ));

  const toggleVisibility = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Animation Demonstrations</h1>

      <Tabs defaultValue="container" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="container">Single Element</TabsTrigger>
          <TabsTrigger value="list">Animated List</TabsTrigger>
          <TabsTrigger value="grid">Animated Grid</TabsTrigger>
        </TabsList>

        <TabsContent value="container">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-3">Animation Variants</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {animationVariants.map((variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                  size="sm"
                >
                  {variant}
                </Button>
              ))}
            </div>

            <Button onClick={toggleVisibility} className="mb-6">
              Replay Animation
            </Button>

            {isVisible && (
              <AnimatedContainer
                variant={selectedVariant as any}
                duration="normal"
                className="p-6 bg-card rounded-lg border shadow-sm"
              >
                <h3 className="text-lg font-medium">Animated Element</h3>
                <p className="text-muted-foreground">
                  This element is using the "{selectedVariant}" animation.
                </p>
              </AnimatedContainer>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Staggered List Animation</CardTitle>
                <CardDescription>
                  Items animate one after another
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={toggleVisibility} className="mb-4">
                  Replay Animation
                </Button>

                {isVisible && (
                  <AnimatedList
                    items={demoItems.map((item) => (
                      <div className="p-3 bg-card border rounded-md mb-2">
                        {item}
                      </div>
                    ))}
                    variant="fadeInLeft"
                    staggerDelay={100}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Different Animation Styles</CardTitle>
                <CardDescription>
                  Try different animation variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "fadeInUp",
                    "fadeInDown",
                    "fadeInLeft",
                    "fadeInRight",
                    "scaleIn",
                  ].map((variant) => (
                    <Button
                      key={variant}
                      variant={
                        selectedVariant === variant ? "default" : "outline"
                      }
                      onClick={() => setSelectedVariant(variant)}
                      size="sm"
                    >
                      {variant}
                    </Button>
                  ))}
                </div>

                <Button onClick={toggleVisibility} className="mb-4">
                  Replay Animation
                </Button>

                {isVisible && (
                  <AnimatedList
                    items={demoItems.map((item) => (
                      <div className="p-3 bg-card border rounded-md mb-2">
                        {item}
                      </div>
                    ))}
                    variant={selectedVariant as any}
                    staggerDelay={75}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grid">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-3">Grid Animation</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {["fadeIn", "fadeInUp", "scaleIn"].map((variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                  size="sm"
                >
                  {variant}
                </Button>
              ))}
            </div>

            <Button onClick={toggleVisibility} className="mb-6">
              Replay Animation
            </Button>

            {isVisible && (
              <AnimatedGrid
                items={cardItems}
                variant={selectedVariant as any}
                staggerDelay={100}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10 p-4 bg-card border rounded-md">
        <h2 className="text-xl font-medium mb-2">Animation Tips</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Use <code>AnimatedContainer</code> for single elements
          </li>
          <li>
            Use <code>AnimatedList</code> for lists with staggered animations
          </li>
          <li>
            Use <code>AnimatedGrid</code> for grid layouts
          </li>
          <li>
            Use <code>PageTransition</code> for page transitions
          </li>
          <li>Combine animations with your toast notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default AnimationDemo;
