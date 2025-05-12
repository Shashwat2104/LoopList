import { ReactNode } from "react";
import { Flame, Trophy, Award, Medal, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StreakMilestoneProps {
  streak: number;
  showAnimation?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const MILESTONE_ICONS: Record<
  number,
  { icon: ReactNode; color: string; name: string }
> = {
  7: {
    icon: <Flame />,
    color: "from-amber-400 to-orange-500",
    name: "1 Week Streak",
  },
  14: {
    icon: <Flame />,
    color: "from-orange-400 to-red-500",
    name: "2 Week Streak",
  },
  30: {
    icon: <Star />,
    color: "from-blue-400 to-indigo-500",
    name: "1 Month Streak",
  },
  60: {
    icon: <Medal />,
    color: "from-indigo-400 to-purple-500",
    name: "2 Month Streak",
  },
  90: {
    icon: <Medal />,
    color: "from-purple-400 to-pink-500",
    name: "3 Month Streak",
  },
  180: {
    icon: <Award />,
    color: "from-pink-400 to-rose-500",
    name: "6 Month Streak",
  },
  365: {
    icon: <Trophy />,
    color: "from-amber-300 to-yellow-500",
    name: "1 Year Streak!",
  },
};

const getStreakMilestone = (streak: number) => {
  const milestones = [365, 180, 90, 60, 30, 14, 7];
  for (const milestone of milestones) {
    if (streak >= milestone) {
      return milestone;
    }
  }
  return 0;
};

export function StreakMilestone({
  streak,
  showAnimation = false,
  size = "md",
  showLabel = true,
  className,
}: StreakMilestoneProps) {
  const milestone = getStreakMilestone(streak);

  if (milestone === 0) {
    return null;
  }

  const milestoneData = MILESTONE_ICONS[milestone];

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const IconComponent = () => {
    const iconSize = { sm: 16, md: 24, lg: 32 }[size];

    return (
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-r",
          sizeClasses[size],
          milestoneData.color
        )}
      >
        <div className="text-white">
          {React.cloneElement(milestoneData.icon as React.ReactElement, {
            size: iconSize,
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showAnimation ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <IconComponent />
        </motion.div>
      ) : (
        <IconComponent />
      )}

      {showLabel && (
        <div className="flex flex-col">
          <span className="font-semibold">{milestoneData.name}</span>
          <span className="text-xs text-muted-foreground">
            {streak} days and counting!
          </span>
        </div>
      )}
    </div>
  );
}

interface StreakCounterProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  showFlame?: boolean;
  animate?: boolean;
}

export function StreakCounter({
  streak,
  size = "md",
  showFlame = true,
  animate = false,
}: StreakCounterProps) {
  if (streak <= 0) return null;

  const flameColor =
    streak >= 30
      ? "text-red-500"
      : streak >= 14
      ? "text-orange-500"
      : "text-amber-500";

  const sizeConfig = {
    sm: { textSize: "text-sm", flameSize: 14 },
    md: { textSize: "text-lg", flameSize: 18 },
    lg: { textSize: "text-2xl", flameSize: 24 },
  }[size];

  return (
    <div className="flex items-center gap-1">
      {showFlame &&
        (animate ? (
          <motion.div
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
            }}
          >
            <Flame size={sizeConfig.flameSize} className={flameColor} />
          </motion.div>
        ) : (
          <Flame size={sizeConfig.flameSize} className={flameColor} />
        ))}
      <span className={`font-bold ${sizeConfig.textSize}`}>{streak}</span>
      <span className="text-muted-foreground">
        {size !== "sm" && "day"} streak
      </span>
    </div>
  );
}
