import { useState } from "react";
import { useLoops } from "@/context/LoopContext";
import MainNav from "@/components/layout/MainNav";
import LoopCard from "@/components/loops/LoopCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Heart, Copy, User } from "lucide-react";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedGrid } from "@/components/ui/animated-list";

export default function ExplorePage() {
  const { publicLoops } = useLoops();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  const filteredLoops = searchQuery
    ? publicLoops.filter(
        (loop) =>
          loop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (loop.emoji && loop.emoji.includes(searchQuery.toLowerCase()))
      )
    : publicLoops;

  // Sort loops based on active tab
  const sortedLoops = [...filteredLoops].sort((a, b) => {
    if (activeTab === "trending") {
      return b.cheers + b.clones - (a.cheers + a.clones);
    } else if (activeTab === "streaks") {
      return b.currentStreak - a.currentStreak;
    } else if (activeTab === "popular") {
      return b.clones - a.clones;
    }
    return 0;
  });

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1 container py-8">
          <AnimatedContainer variant="fadeIn">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Explore Loops
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover new habits and join others in building better routines
              </p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeIn" delay="small">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search loops..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeIn" delay="medium">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="trending"
                  className="flex items-center gap-1"
                >
                  <TrendingUp size={16} />
                  <span>Trending</span>
                </TabsTrigger>
                <TabsTrigger
                  value="streaks"
                  className="flex items-center gap-1"
                >
                  <Heart size={16} />
                  <span>Top Streaks</span>
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex items-center gap-1"
                >
                  <Copy size={16} />
                  <span>Most Cloned</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="mt-0">
                {sortedLoops.length > 0 ? (
                  <AnimatedGrid
                    items={sortedLoops.map((loop) => (
                      <LoopCard key={loop.id} loop={loop} />
                    ))}
                    variant="fadeInUp"
                    staggerDelay={75}
                    gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  />
                ) : (
                  <AnimatedContainer
                    variant="fadeIn"
                    className="text-center py-12"
                  >
                    <p className="text-muted-foreground">
                      No loops found. Try adjusting your search.
                    </p>
                  </AnimatedContainer>
                )}
              </TabsContent>

              <TabsContent value="streaks" className="mt-0">
                {sortedLoops.length > 0 ? (
                  <AnimatedGrid
                    items={sortedLoops.map((loop) => (
                      <LoopCard key={loop.id} loop={loop} />
                    ))}
                    variant="fadeInUp"
                    staggerDelay={75}
                    gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  />
                ) : (
                  <AnimatedContainer
                    variant="fadeIn"
                    className="text-center py-12"
                  >
                    <p className="text-muted-foreground">
                      No loops found. Try adjusting your search.
                    </p>
                  </AnimatedContainer>
                )}
              </TabsContent>

              <TabsContent value="popular" className="mt-0">
                {sortedLoops.length > 0 ? (
                  <AnimatedGrid
                    items={sortedLoops.map((loop) => (
                      <LoopCard key={loop.id} loop={loop} />
                    ))}
                    variant="fadeInUp"
                    staggerDelay={75}
                    gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  />
                ) : (
                  <AnimatedContainer
                    variant="fadeIn"
                    className="text-center py-12"
                  >
                    <p className="text-muted-foreground">
                      No loops found. Try adjusting your search.
                    </p>
                  </AnimatedContainer>
                )}
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
        </main>
      </div>
    </SimplePageTransition>
  );
}
