import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLoops } from "@/context/LoopContext";
import { Button } from "@/components/ui/button";
import MainNav from "@/components/layout/MainNav";
import LoopCard from "@/components/loops/LoopCard";
import { ArrowRight } from "lucide-react";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedList } from "@/components/ui/animated-list";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getTrendingLoops, getLoopOfTheDay } = useLoops();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Get featured loops for the landing page
  const trendingLoops = getTrendingLoops().slice(0, 3);
  const featuredLoop = getLoopOfTheDay();

  // Prepare feature items for animated list
  const featureItems = [
    {
      icon: "🔄",
      title: "Create Your Loops",
      description:
        "Build micro-habits with custom frequencies and track your progress daily.",
    },
    {
      icon: "🔥",
      title: "Build Streaks",
      description:
        "Watch your streaks grow as you check in daily, with visual heatmap tracking.",
    },
    {
      icon: "👏",
      title: "Share & Connect",
      description:
        "Make your loops public for accountability, and cheer on others' progress.",
    },
  ];

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1">
          {/* Hero section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
            <div className="container max-w-6xl mx-auto px-4 text-center">
              <AnimatedContainer variant="fadeInDown" duration="normal">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  Build better habits,{" "}
                  <span className="text-flame-500">one day at a time</span>
                </h1>
              </AnimatedContainer>

              <AnimatedContainer
                variant="fadeIn"
                delay="small"
                duration="normal"
              >
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  LoopList helps you build micro-habits with visual streaks,
                  public accountability, and a supportive community.
                </p>
              </AnimatedContainer>

              <AnimatedContainer variant="fadeInUp" delay="medium">
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6"
                    onClick={() => navigate("/explore")}
                  >
                    Explore Loops
                  </Button>
                </div>
              </AnimatedContainer>
            </div>
          </section>

          {/* Features section */}
          <section className="py-16 bg-background">
            <div className="container max-w-6xl mx-auto px-4">
              <AnimatedContainer variant="fadeIn" className="text-center mb-12">
                <h2 className="text-3xl font-bold">How LoopList Works</h2>
              </AnimatedContainer>

              <AnimatedList
                items={featureItems.map((item, index) => (
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-secondary/40 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
                variant="fadeInUp"
                staggerDelay={100}
                baseDelay={300}
                containerAs="div"
                className="grid md:grid-cols-3 gap-8"
              />
            </div>
          </section>

          {/* Trending loops preview */}
          {trendingLoops.length > 0 && (
            <section className="py-16 bg-secondary/10">
              <div className="container max-w-6xl mx-auto px-4">
                <AnimatedContainer
                  variant="fadeIn"
                  className="flex justify-between items-center mb-8"
                >
                  <h2 className="text-3xl font-bold">Trending Loops</h2>
                  <Button variant="ghost" onClick={() => navigate("/explore")}>
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </AnimatedContainer>

                <AnimatedList
                  items={trendingLoops.map((loop) => (
                    <LoopCard key={loop.id} loop={loop} />
                  ))}
                  variant="fadeInRight"
                  staggerDelay={150}
                  containerAs="div"
                  className="grid md:grid-cols-3 gap-6"
                />
              </div>
            </section>
          )}

          {/* Featured loop of the day */}
          {featuredLoop && (
            <section className="py-16 bg-background">
              <div className="container max-w-6xl mx-auto px-4">
                <AnimatedContainer variant="fadeIn">
                  <h2 className="text-3xl font-bold mb-8">Loop of the Day</h2>
                </AnimatedContainer>

                <AnimatedContainer
                  variant="scaleIn"
                  delay="small"
                  className="max-w-md mx-auto"
                >
                  <LoopCard loop={featuredLoop} />
                </AnimatedContainer>

                <AnimatedContainer
                  variant="fadeInUp"
                  delay="medium"
                  className="text-center mt-8"
                >
                  <Button onClick={() => navigate("/login")}>
                    Sign up to clone this loop
                  </Button>
                </AnimatedContainer>
              </div>
            </section>
          )}

          {/* CTA section */}
          <section className="py-16 bg-flame-50 dark:bg-flame-950/20">
            <div className="container max-w-6xl mx-auto px-4 text-center">
              <AnimatedContainer variant="fadeIn">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to start your journey?
                </h2>
              </AnimatedContainer>

              <AnimatedContainer variant="fadeIn" delay="small">
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of users building better habits one day at a
                  time.
                </p>
              </AnimatedContainer>

              <AnimatedContainer variant="scaleIn" delay="medium">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-flame-500 hover:bg-flame-600"
                  onClick={() => navigate("/login")}
                >
                  Create Your First Loop
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </AnimatedContainer>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t">
            <div className="container max-w-6xl mx-auto px-4 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} LoopList. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </SimplePageTransition>
  );
};

export default Index;
