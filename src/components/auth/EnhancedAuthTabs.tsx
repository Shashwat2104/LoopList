import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedLoginForm from "@/components/auth/AnimatedLoginForm";
import AnimatedSignupForm from "@/components/auth/AnimatedSignupForm";

export default function EnhancedAuthTabs() {
  const [activeTab, setActiveTab] = useState("login");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const loginTabRef = useRef<HTMLButtonElement>(null);
  const signupTabRef = useRef<HTMLButtonElement>(null);

  // Initial animation
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Initial state
    tl.set(containerRef.current, {
      opacity: 0,
      y: 30,
      transformOrigin: "center",
    });

    // Animate in
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.8)",
    });

    // Animate card shadow
    tl.fromTo(
      cardRef.current,
      { boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
      {
        boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    // Animate tabs
    tl.fromTo(
      [loginTabRef.current, signupTabRef.current],
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Tab switch animation
  useEffect(() => {
    if (!containerRef.current) return;

    // Create subtle animation when switching tabs
    gsap.fromTo(
      containerRef.current,
      { scale: 0.98 },
      {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.75)",
      }
    );

    // Add a subtle pulse to the active tab
    const activeTabRef = activeTab === "login" ? loginTabRef : signupTabRef;
    gsap.fromTo(
      activeTabRef.current,
      { backgroundColor: "rgba(255, 127, 80, 0.2)" },
      {
        backgroundColor: "rgba(255, 127, 80, 0.1)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );

    // Clear animation on tab change
    return () => {
      gsap.killTweensOf(activeTabRef.current);
    };
  }, [activeTab]);

  // Add hover animations for interactive elements
  useGSAP(() => {
    // Add hover effect for buttons
    const buttons = containerRef.current?.querySelectorAll("button");
    if (buttons) {
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      });
    }

    // Add hover effect for inputs
    const inputs = containerRef.current?.querySelectorAll("input");
    if (inputs) {
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            boxShadow: "0 0 0 3px rgba(255, 127, 80, 0.25)",
            duration: 0.3,
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            boxShadow: "none",
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-md">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            ref={loginTabRef}
            value="login"
            className="data-[state=active]:bg-flame-50 data-[state=active]:text-flame-700 transition-all"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            ref={signupTabRef}
            value="signup"
            className="data-[state=active]:bg-flame-50 data-[state=active]:text-flame-700 transition-all"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-lg shadow-lg"
        >
          <TabsContent value="login" className="p-0">
            <AnimatedLoginForm />
          </TabsContent>
          <TabsContent value="signup" className="p-0">
            <AnimatedSignupForm />
          </TabsContent>
        </div>
      </Tabs>

      {/* Background decoration */}
      <div className="absolute -z-10 top-20 right-20 w-64 h-64 bg-flame-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -z-10 bottom-20 left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
    </div>
  );
}
