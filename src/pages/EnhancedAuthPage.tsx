import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import MainNav from "@/components/layout/MainNav";
import EnhancedAuthTabs from "@/components/auth/EnhancedAuthTabs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function EnhancedAuthPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the intended destination from query params or default to dashboard
  const from = new URLSearchParams(location.search).get("from") || "/dashboard";

  useEffect(() => {
    // Only redirect if user is loaded and authenticated
    if (!isLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, isLoading, from]);

  // Apply page animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // Create particles
    const numParticles = 30;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");

      // Style the particle
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = `rgba(${Math.random() * 255}, ${
        Math.random() * 100 + 100
      }, ${Math.random() * 100 + 155}, 0.3)`;
      particle.style.pointerEvents = "none";

      // Random starting position
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;

      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.to(particle, {
        x: `${Math.random() * 200 - 100}px`,
        y: `${Math.random() * 200 - 100}px`,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      });
    }

    // Optional background gradient animation
    gsap.to(containerRef.current, {
      background: `linear-gradient(230deg, rgba(255,127,80,0.1), rgba(100,149,237,0.1), rgba(255,105,180,0.1))`,
      backgroundSize: "400% 400%",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      // Clean up particles
      particles.forEach((p) => {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      });
    };
  }, []);

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <div ref={containerRef} className="min-h-screen flex flex-col">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-flame-400"></div>
            <div className="h-3 w-3 rounded-full bg-flame-400"></div>
            <div className="h-3 w-3 rounded-full bg-flame-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col overflow-hidden relative"
    >
      <MainNav />

      <main className="flex-1 flex items-center justify-center p-4 relative">
        <EnhancedAuthTabs />
      </main>

      {/* Bottom footer with terms */}
      <div className="py-4 text-center text-sm text-muted-foreground">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}
