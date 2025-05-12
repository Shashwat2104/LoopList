import { useState } from "react";
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
}

export default function LoopCard({ loop, showActions = true }: LoopCardProps) {
  const { cheerLoop, cloneLoop, hasUserCheeredLoop } = useLoops();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cheerAnimating, setCheerAnimating] = useState(false);

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

  const handleCheer = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to cheer loops");
      return;
    }

    try {
      setCheerAnimating(true);
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
      await cloneLoop(loop.id);
      toast.success("Loop cloned to your dashboard!");
    } catch (error) {
      toast.error("Failed to clone loop");
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
            <Flame
              key={index}
              size={16}
              className={`${flameIntensity} ${index > 0 ? "-ml-1" : ""}`}
            />
          ))}
      </div>
    );
  };

  return (
    <div
      className="loop-card cursor-pointer hover:shadow-md transition-shadow"
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
          <div className="streak-badge flex items-center space-x-1 animate-bounce-subtle bg-amber-50 px-2 py-1 rounded-full">
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

      <div className="mt-3 flex items-center text-sm text-muted-foreground gap-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{loop.frequency}</span>
        </div>
        <div className="flex items-center gap-1">
          <BarChart3 size={14} />
          <span>{Math.round(loop.completionRate * 100)}% completed</span>
        </div>
      </div>

      {/* Streak visualization for active loops */}
      {loop.status === "active" && loop.currentStreak > 0 && (
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              loop.currentStreak >= 30
                ? "bg-gradient-to-r from-red-500 to-orange-500"
                : loop.currentStreak >= 14
                ? "bg-gradient-to-r from-orange-500 to-amber-500"
                : "bg-gradient-to-r from-amber-500 to-yellow-500"
            }`}
            style={{
              width: `${Math.min(100, (loop.currentStreak / 100) * 100)}%`,
            }}
          />
        </div>
      )}

      {showActions && (
        <div className="mt-4 flex justify-between items-center pt-3 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User size={14} />
            <span>by {loop.userId === user?.id ? "You" : "User"}</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant={hasLiked ? "secondary" : "ghost"}
              size="sm"
              onClick={handleCheer}
              className={cheerAnimating ? "animate-celebration" : ""}
            >
              <Heart
                size={16}
                className={`mr-1 ${
                  hasLiked ? "fill-flame-500 text-flame-500" : "text-flame-500"
                }`}
              />
              <span>{loop.cheers}</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={handleClone}>
              <Copy size={16} className="mr-1 text-purple-500" />
              <span>{loop.clones}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
