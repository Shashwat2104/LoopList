import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loop } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Heart,
  User,
  Copy,
  Calendar,
  BarChart3,
  Award,
  TrendingUp,
  Zap,
  Medal,
  Trophy,
  Flame,
} from "lucide-react";
import { useLoops } from "@/context/LoopContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Category icon mapping
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  fitness: (
    <div className="h-5 w-5 text-blue-500 bg-blue-100 rounded-full flex items-center justify-center p-1">
      💪
    </div>
  ),
  mindfulness: (
    <div className="h-5 w-5 text-purple-500 bg-purple-100 rounded-full flex items-center justify-center p-1">
      🧘
    </div>
  ),
  nutrition: (
    <div className="h-5 w-5 text-red-500 bg-red-100 rounded-full flex items-center justify-center p-1">
      🍎
    </div>
  ),
  learning: (
    <div className="h-5 w-5 text-amber-500 bg-amber-100 rounded-full flex items-center justify-center p-1">
      📚
    </div>
  ),
  productivity: (
    <div className="h-5 w-5 text-green-500 bg-green-100 rounded-full flex items-center justify-center p-1">
      🎯
    </div>
  ),
  coding: (
    <div className="h-5 w-5 text-slate-500 bg-slate-100 rounded-full flex items-center justify-center p-1">
      💻
    </div>
  ),
  writing: (
    <div className="h-5 w-5 text-pink-500 bg-pink-100 rounded-full flex items-center justify-center p-1">
      ✍️
    </div>
  ),
  health: (
    <div className="h-5 w-5 text-emerald-500 bg-emerald-100 rounded-full flex items-center justify-center p-1">
      💊
    </div>
  ),
  hydration: (
    <div className="h-5 w-5 text-cyan-500 bg-cyan-100 rounded-full flex items-center justify-center p-1">
      💧
    </div>
  ),
  sleep: (
    <div className="h-5 w-5 text-indigo-500 bg-indigo-100 rounded-full flex items-center justify-center p-1">
      😴
    </div>
  ),
};

// Achievement badges
const ACHIEVEMENT_BADGES: Record<
  string,
  { icon: JSX.Element; color: string; label: string }
> = {
  starter: {
    icon: <Zap size={14} />,
    color: "bg-blue-100 text-blue-600",
    label: "Just Started",
  },
  week1: {
    icon: <TrendingUp size={14} />,
    color: "bg-green-100 text-green-600",
    label: "1 Week",
  },
  month1: {
    icon: <Award size={14} />,
    color: "bg-amber-100 text-amber-600",
    label: "1 Month",
  },
  month3: {
    icon: <Medal size={14} />,
    color: "bg-purple-100 text-purple-600",
    label: "3 Months",
  },
  year1: {
    icon: <Trophy size={14} />,
    color: "bg-red-100 text-red-600",
    label: "1 Year",
  },
};

interface LoopCardProps {
  loop: Loop;
  showActions?: boolean;
  delay?: number;
}

export default function LoopCard({
  loop,
  showActions = true,
  delay = 0,
}: LoopCardProps) {
  const { cheerLoop, cloneLoop, hasUserCheeredLoop } = useLoops();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cheerAnimating, setCheerAnimating] = useState(false);
  const [cloneAnimating, setCloneAnimating] = useState(false);

  // Refs for animations
  const cardRef = useRef<HTMLDivElement>(null);
  const streakBadgeRef = useRef<HTMLDivElement>(null);
  const cheerButtonRef = useRef<HTMLButtonElement>(null);
  const cloneButtonRef = useRef<HTMLButtonElement>(null);
  const flameRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if the user has already cheered this loop
  const hasLiked = user ? hasUserCheeredLoop(loop.id) : false;

  // Get achievement badge based on current streak
  const getAchievementBadge = () => {
    const streak = loop.currentStreak;
    if (streak >= 365) return ACHIEVEMENT_BADGES.year1;
    if (streak >= 90) return ACHIEVEMENT_BADGES.month3;
    if (streak >= 30) return ACHIEVEMENT_BADGES.month1;
    if (streak >= 7) return ACHIEVEMENT_BADGES.week1;
    if (streak > 0) return ACHIEVEMENT_BADGES.starter;
    return null;
  };

  const achievementBadge = getAchievementBadge();

  // GSAP animations
  useGSAP(() => {
    if (!cardRef.current) return;

    // Initial animation for the card
    gsap.fromTo(
      cardRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: delay * 0.1,
      }
    );

    // Streak badge animation
    if (
      streakBadgeRef.current &&
      loop.currentStreak > 0 &&
      loop.status === "active"
    ) {
      gsap.fromTo(
        streakBadgeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          delay: delay * 0.1 + 0.3,
        }
      );

      // Create pulsing effect for active streaks
      gsap.to(streakBadgeRef.current, {
        boxShadow: "0 0 8px rgba(255, 160, 0, 0.7)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }

    // Animate flames for active streaks
    flameRefs.current.forEach((flame, index) => {
      if (flame) {
        gsap.to(flame, {
          y: "-5px",
          repeat: -1,
          yoyo: true,
          duration: 0.8 + index * 0.2,
          ease: "sine.inOut",
          delay: index * 0.1,
        });
      }
    });
  }, [loop.id, delay]);

  const handleCheer = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to cheer loops");
      return;
    }

    try {
      setCheerAnimating(true);

      // Create heart burst animation
      if (cheerButtonRef.current) {
        const button = cheerButtonRef.current;
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Create heart particles
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement("div");
          particle.innerHTML = "❤️";
          particle.style.position = "fixed";
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particle.style.zIndex = "1000";
          particle.style.pointerEvents = "none";
          particle.style.fontSize = "16px";
          document.body.appendChild(particle);

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: Math.random() * -100,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
            duration: 1 + Math.random(),
            onComplete: () => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
              }
            },
          });
        }

        // Animate the heart icon itself
        const heartIcon = button.querySelector("svg");
        if (heartIcon) {
          gsap.fromTo(
            heartIcon,
            { scale: 1 },
            {
              scale: 1.5,
              duration: 0.3,
              ease: "back.out(3)",
              onComplete: () => {
                gsap.to(heartIcon, { scale: 1, duration: 0.2 });
              },
            }
          );
        }
      }

      await cheerLoop(loop.id);
      setTimeout(() => setCheerAnimating(false), 1000);
    } catch (error) {
      toast.error("Failed to cheer loop");
      setCheerAnimating(false);
    }
  };

  const handleClone = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to clone loops");
      return;
    }

    try {
      setCloneAnimating(true);

      // Clone animation
      if (cloneButtonRef.current && cardRef.current) {
        const timeline = gsap.timeline();

        // Create a clone of the card that we'll animate
        const cardClone = cardRef.current.cloneNode(true) as HTMLDivElement;
        const rect = cardRef.current.getBoundingClientRect();

        cardClone.style.position = "fixed";
        cardClone.style.top = `${rect.top}px`;
        cardClone.style.left = `${rect.left}px`;
        cardClone.style.width = `${rect.width}px`;
        cardClone.style.height = `${rect.height}px`;
        cardClone.style.zIndex = "1000";
        cardClone.style.pointerEvents = "none";
        document.body.appendChild(cardClone);

        // Target position (dashboard button in header)
        const dashboardLink = document.querySelector('a[href="/dashboard"]');
        const targetRect = dashboardLink
          ? dashboardLink.getBoundingClientRect()
          : { top: 0, left: window.innerWidth / 2 };

        // Animate the clone to fly to dashboard
        timeline.to(cardClone, {
          top: targetRect.top,
          left: targetRect.left,
          scale: 0.2,
          opacity: 0,
          rotation: 5,
          duration: 0.8,
          ease: "power1.inOut",
          onComplete: () => {
            if (cardClone.parentNode) {
              cardClone.parentNode.removeChild(cardClone);
            }
          },
        });
      }

      await cloneLoop(loop.id);
      toast.success("Loop cloned to your dashboard!");
      setCloneAnimating(false);
    } catch (error) {
      toast.error("Failed to clone loop");
      setCloneAnimating(false);
    }
  };

  const handleClick = () => {
    navigate(`/loop/${loop.id}`);
  };

  // Render streak flames based on current streak
  const renderStreakFlames = () => {
    if (loop.currentStreak <= 0 || loop.status !== "active") return null;

    // Determine flame intensity based on streak length
    const flameIntensity =
      loop.currentStreak >= 30
        ? "text-red-500"
        : loop.currentStreak >= 14
        ? "text-orange-500"
        : "text-amber-500";

    // Show multiple flames for longer streaks
    const flameCount =
      loop.currentStreak >= 30 ? 3 : loop.currentStreak >= 14 ? 2 : 1;

    return (
      <div className="flex">
        {Array(flameCount)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              ref={(el) => (flameRefs.current[index] = el)}
              className={`inline-block ${index > 0 ? "-ml-1" : ""}`}
            >
              <Flame size={16} className={`${flameIntensity}`} />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      className="loop-card cursor-pointer hover:shadow-md transition-shadow bg-white border rounded-lg p-4"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl relative">
            {loop.emoji || "🔄"}
            {loop.category && CATEGORY_ICONS[loop.category] && (
              <div className="absolute -bottom-1 -right-1">
                {CATEGORY_ICONS[loop.category]}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg">{loop.title}</h3>
        </div>
        {loop.status === "active" && (
          <div
            ref={streakBadgeRef}
            className="streak-badge flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full"
          >
            {renderStreakFlames()}
            <span className="font-medium text-amber-700">
              {loop.currentStreak} days
            </span>
          </div>
        )}
        {loop.status === "broken" && (
          <Badge variant="outline" className="bg-muted">
            Streak broken
          </Badge>
        )}
        {loop.status === "completed" && (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Trophy size={12} className="mr-1" /> Completed
          </Badge>
        )}
      </div>

      {achievementBadge && loop.status === "active" && (
        <div className="mt-2">
          <span
            className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${achievementBadge.color}`}
          >
            {achievementBadge.icon}
            <span className="ml-1">{achievementBadge.label}</span>
          </span>
        </div>
      )}

      <p className="text-sm text-muted-foreground my-3 line-clamp-2">
        {loop.description}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <User size={14} className="mr-1" />
          <span>{loop.author?.name || "Anonymous"}</span>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <Button
              ref={cheerButtonRef}
              variant={hasLiked ? "secondary" : "ghost"}
              size="sm"
              className={`px-3 ${hasLiked ? "bg-red-50 text-red-600" : ""}`}
              onClick={handleCheer}
              disabled={cheerAnimating}
            >
              <Heart
                size={16}
                className={`mr-1 ${
                  hasLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{loop.cheers}</span>
            </Button>
            <Button
              ref={cloneButtonRef}
              variant="ghost"
              size="sm"
              className="px-3"
              onClick={handleClone}
              disabled={cloneAnimating}
            >
              <Copy size={16} className="mr-1" />
              <span>{loop.clones}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
