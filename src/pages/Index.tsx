import { useEffect, useRef } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getTrendingLoops, getLoopOfTheDay } = useLoops();

  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroParagraphRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const trendingRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // GSAP animations
  useGSAP(() => {
    if (!pageRef.current) return;

    // Main timeline
    const mainTl = gsap.timeline();

    // Text splitting for hero title
    if (heroTitleRef.current) {
      const heroText = new SplitType(heroTitleRef.current, {
        types: "chars, words",
      });

      // Staggered text animation
      mainTl.from(heroText.chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Special effect for "one day at a time"
      const accentWords = heroTitleRef.current.querySelector(".text-flame-500");
      if (accentWords) {
        gsap.to(accentWords, {
          color: "#ff6b35",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Hero subtitle animation
    if (heroParagraphRef.current) {
      mainTl.from(
        heroParagraphRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // Hero buttons animation
    const heroButtons = heroRef.current?.querySelectorAll("button");
    if (heroButtons) {
      mainTl.from(
        heroButtons,
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
    }

    // Features section scroll animation
    if (featuresRef.current) {
      const featureItems =
        featuresRef.current.querySelectorAll(".feature-item");

      gsap.from(featureItems, {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Feature icons bounce animation
      const featureIcons =
        featuresRef.current.querySelectorAll(".feature-icon");
      featureIcons.forEach((icon) => {
        gsap.to(icon, {
          y: -10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random(),
        });
      });
    }

    // Trending loops section animation
    if (trendingRef.current) {
      const trendingCards = trendingRef.current.querySelectorAll(".loop-card");

      gsap.from(trendingCards, {
        opacity: 0,
        x: 100,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trendingRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // CTA section animation
    if (ctaRef.current) {
      const ctaElements = ctaRef.current.querySelectorAll("h2, p, button");

      gsap.from(ctaElements, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Pulsing CTA button
      const ctaButton = ctaRef.current.querySelector("button");
      if (ctaButton) {
        gsap.to(ctaButton, {
          boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)",
          scale: 1.05,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    return () => {
      // Clean up animations when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <div ref={pageRef} className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1">
          {/* Hero section */}
          <section
            ref={heroRef}
            className="py-16 md:py-28 bg-gradient-to-b from-background to-secondary/20 overflow-hidden"
          >
            <div className="container max-w-6xl mx-auto px-4 text-center">
              <h1
                ref={heroTitleRef}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                Build better habits,{" "}
                <span className="text-flame-500">one day at a time</span>
              </h1>

              <p
                ref={heroParagraphRef}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
              >
                LoopList helps you build micro-habits with visual streaks,
                public accountability, and a supportive community.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hero-button"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 hero-button"
                  onClick={() => navigate("/explore")}
                >
                  Explore Loops
                </Button>
              </div>
            </div>
          </section>

          {/* Features section */}
          <section ref={featuresRef} className="py-16 bg-background">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">How LoopList Works</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {featureItems.map((item, index) => (
                  <div
                    key={index}
                    className="feature-item flex flex-col items-center text-center p-4"
                  >
                    <div className="feature-icon bg-secondary/40 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trending loops preview */}
          {trendingLoops.length > 0 && (
            <section ref={trendingRef} className="py-16 bg-secondary/10">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Trending Loops</h2>
                  <Button variant="ghost" onClick={() => navigate("/explore")}>
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {trendingLoops.map((loop, index) => (
                    <LoopCard key={loop.id} loop={loop} delay={index * 0.2} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Featured loop of the day */}
          {featuredLoop && (
            <section className="py-16 bg-background">
              <div className="container max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Loop of the Day</h2>

                <div className="max-w-md mx-auto">
                  <LoopCard loop={featuredLoop} />
                </div>

                <div className="text-center mt-8">
                  <Button onClick={() => navigate("/login")}>
                    Sign up to clone this loop
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* CTA section */}
          <section
            ref={ctaRef}
            className="py-16 bg-flame-50 dark:bg-flame-950/20"
          >
            <div className="container max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to start your journey?
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of users building better habits one day at a
                time.
              </p>

              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-flame-500 hover:bg-flame-600"
                onClick={() => navigate("/login")}
              >
                Create Your First Loop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
