import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLoops } from "@/context/LoopContext";
import MainNav from "@/components/layout/MainNav";
import LoopCard from "@/components/loops/LoopCard";
import CreateLoopForm from "@/components/loops/CreateLoopForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoopStatus } from "@/types";
import useToast from "@/hooks/useToast";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedGrid } from "@/components/ui/animated-list";

export default function DashboardPage() {
  const { user } = useAuth();
  const { getUserLoops } = useLoops();
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<LoopStatus>("active");

  // Use useEffect for authentication check and redirection
  useEffect(() => {
    if (!user) {
      toast.error("Please login first to access the dashboard.");
      navigate("/login");
    }
  }, [user, navigate, toast]);

  // Return null during initial render if not authenticated
  if (!user) {
    return null;
  }

  const userLoops = getUserLoops();
  const activeLoops = userLoops.filter((loop) => loop.status === "active");
  const brokenLoops = userLoops.filter((loop) => loop.status === "broken");
  const completedLoops = userLoops.filter(
    (loop) => loop.status === "completed"
  );

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1 container py-8">
          <AnimatedContainer
            variant="fadeIn"
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                My Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">{todayDate}</p>
            </div>

            <AnimatedContainer variant="fadeIn" delay="small">
              <CreateLoopForm />
            </AnimatedContainer>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeIn" delay="medium" className="mt-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as LoopStatus)}
              className="mt-6"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="active" className="relative">
                  Active
                  {activeLoops.length > 0 && (
                    <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {activeLoops.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="broken">
                  Broken
                  {brokenLoops.length > 0 && (
                    <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {brokenLoops.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  {completedLoops.length > 0 && (
                    <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {completedLoops.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-0">
                {activeLoops.length > 0 ? (
                  <AnimatedGrid
                    items={activeLoops.map((loop) => (
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
                    <p className="text-muted-foreground mb-4">
                      You don't have any active loops yet.
                    </p>
                    <CreateLoopForm />
                  </AnimatedContainer>
                )}
              </TabsContent>

              <TabsContent value="broken" className="mt-0">
                {brokenLoops.length > 0 ? (
                  <AnimatedGrid
                    items={brokenLoops.map((loop) => (
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
                      No broken loops. Keep up the good work!
                    </p>
                  </AnimatedContainer>
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                {completedLoops.length > 0 ? (
                  <AnimatedGrid
                    items={completedLoops.map((loop) => (
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
                      No completed loops yet. Keep building those streaks!
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
