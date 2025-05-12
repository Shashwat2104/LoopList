import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Medal,
  Award,
  Trophy,
  Crown,
  Zap,
  Star,
  Flame,
  Target,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  unlockedAt?: Date;
  progress?: number;
  color: string;
  category: "streak" | "completion" | "social" | "special";
}

interface AchievementsBadgesProps {
  achievements: Achievement[];
}

export const ACHIEVEMENT_DATA: Achievement[] = [
  {
    id: "streak_7days",
    name: "Week Warrior",
    description: "Maintain a streak for 7 consecutive days",
    icon: <Flame className="h-6 w-6" />,
    color: "text-orange-500 bg-orange-100",
    category: "streak",
  },
  {
    id: "streak_30days",
    name: "Monthly Master",
    description: "Maintain a streak for 30 consecutive days",
    icon: <Star className="h-6 w-6" />,
    color: "text-blue-500 bg-blue-100",
    category: "streak",
  },
  {
    id: "streak_90days",
    name: "Quarterly Champion",
    description: "Maintain a streak for 90 consecutive days",
    icon: <Medal className="h-6 w-6" />,
    color: "text-indigo-500 bg-indigo-100",
    category: "streak",
  },
  {
    id: "streak_180days",
    name: "Half-Year Hero",
    description: "Maintain a streak for 180 consecutive days",
    icon: <Medal className="h-6 w-6" />,
    color: "text-purple-500 bg-purple-100",
    category: "streak",
  },
  {
    id: "streak_365days",
    name: "Year-Long Legend",
    description: "Maintain a streak for a full year",
    icon: <Trophy className="h-6 w-6" />,
    color: "text-amber-500 bg-amber-100",
    category: "streak",
  },
  {
    id: "completion_first",
    name: "First Step",
    description: "Complete your first habit check-in",
    icon: <Zap className="h-6 w-6" />,
    color: "text-green-500 bg-green-100",
    category: "completion",
  },
  {
    id: "completion_10",
    name: "Perfect 10",
    description: "Complete 10 habit check-ins",
    icon: <Target className="h-6 w-6" />,
    color: "text-teal-500 bg-teal-100",
    category: "completion",
  },
  {
    id: "completion_50",
    name: "Halfway Hero",
    description: "Complete 50 habit check-ins",
    icon: <Award className="h-6 w-6" />,
    color: "text-emerald-500 bg-emerald-100",
    category: "completion",
  },
  {
    id: "completion_100",
    name: "Century Club",
    description: "Complete 100 habit check-ins",
    icon: <Crown className="h-6 w-6" />,
    color: "text-yellow-500 bg-yellow-100",
    category: "completion",
  },
  {
    id: "social_first_cheer",
    name: "First Fan",
    description: "Receive your first cheer from another user",
    icon: <Star className="h-6 w-6" />,
    color: "text-pink-500 bg-pink-100",
    category: "social",
  },
  {
    id: "social_clone",
    name: "Trendsetter",
    description: "Have your habit cloned by another user",
    icon: <Calendar className="h-6 w-6" />,
    color: "text-cyan-500 bg-cyan-100",
    category: "social",
  },
];

export function AchievementBadges({ achievements }: AchievementsBadgesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(
    null
  );

  const categories = [
    { id: "all", name: "All" },
    { id: "streak", name: "Streaks" },
    { id: "completion", name: "Completions" },
    { id: "social", name: "Social" },
    { id: "special", name: "Special" },
  ];

  const filteredAchievements =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  return (
    <div className="achievements-container">
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={
              activeCategory === category.id ? "" : "text-muted-foreground"
            }
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <AnimatePresence>
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onMouseEnter={() => setHoveredAchievement(achievement.id)}
              onMouseLeave={() => setHoveredAchievement(null)}
            >
              <div
                className={`flex flex-col items-center justify-center rounded-lg p-3 relative ${
                  achievement.unlockedAt
                    ? achievement.color
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <div className="relative">
                  {achievement.icon}
                  {achievement.unlockedAt && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="text-xs mt-2 font-medium text-center">
                  {achievement.name}
                </div>

                {achievement.progress !== undefined &&
                  achievement.progress < 1 && (
                    <div className="w-full h-1 mt-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                        style={{ width: `${achievement.progress * 100}%` }}
                      />
                    </div>
                  )}
              </div>

              {hoveredAchievement === achievement.id && (
                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-md shadow-lg text-xs">
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  {achievement.unlockedAt && (
                    <p className="text-green-600 mt-1">
                      Unlocked: {achievement.unlockedAt.toLocaleDateString()}
                    </p>
                  )}
                  {achievement.progress !== undefined &&
                    achievement.progress < 1 && (
                      <p className="text-muted-foreground mt-1">
                        Progress: {Math.round(achievement.progress * 100)}%
                      </p>
                    )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <h3 className="text-lg font-medium">No achievements yet</h3>
          <p className="mt-1">
            Keep building your streaks to unlock achievements!
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm gap-1 text-muted-foreground"
        >
          View all achievements <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
