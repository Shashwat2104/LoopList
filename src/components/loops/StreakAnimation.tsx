import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StreakAnimationProps {
  streak: number;
  previousStreak?: number;
  onComplete?: () => void;
  size?: "sm" | "md" | "lg";
  showCelebration?: boolean;
}

export const StreakAnimation: React.FC<StreakAnimationProps> = ({
  streak,
  previousStreak,
  onComplete,
  size = "md",
  showCelebration = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  // Size variants
  const sizeVariants = {
    sm: { fontSize: "1.5rem", padding: "0.5rem" },
    md: { fontSize: "2rem", padding: "0.75rem" },
    lg: { fontSize: "3rem", padding: "1rem" },
  };

  const handleAnimationComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    // Only animate if streak changed and is greater than 0
    if (
      previousStreak !== undefined &&
      streak > 0 &&
      streak !== previousStreak
    ) {
      setIsAnimating(true);

      // Show celebration emoji for special milestones
      if (showCelebration && (streak % 5 === 0 || streak % 7 === 0)) {
        setShowEmoji(true);
        const timer = setTimeout(() => setShowEmoji(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [streak, previousStreak, showCelebration]);

  // Get celebration emoji based on streak
  const getCelebrationEmoji = () => {
    if (streak % 30 === 0) return "🏆";
    if (streak % 21 === 0) return "🎯";
    if (streak % 14 === 0) return "🔥🔥";
    if (streak % 7 === 0) return "🎉";
    if (streak % 5 === 0) return "👏";
    return "✨";
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Fire effect for the streak - with smoother animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-flame-500/20 flex items-center justify-center"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={
          isAnimating
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }
            : { scale: 1, opacity: 0.5 }
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          repeat: 0,
        }}
        onAnimationComplete={() => setIsAnimating(false)}
      />

      {/* Streak counter - smoother scaling and rotation */}
      <motion.div
        className="relative rounded-full bg-gradient-to-br from-flame-500 to-flame-600 text-white font-bold flex items-center justify-center"
        style={{
          ...sizeVariants[size],
          boxShadow: "0 4px 12px -2px rgba(255, 107, 53, 0.35)",
          willChange: "transform",
        }}
        initial={{ scale: 1 }}
        animate={
          isAnimating
            ? {
                scale: [1, 1.15, 1],
                rotate: [0, streak % 2 === 0 ? 8 : -8, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={{
          duration: 0.8,
          ease: "backOut",
          times: [0, 0.6, 1],
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        <span className="flex items-center justify-center gap-1">
          <span className="inline-block mr-1">🔥</span>
          <span className="counter-digits relative inline-block">{streak}</span>
        </span>
      </motion.div>

      {/* Celebration emojis - improved animation */}
      <AnimatePresence mode="wait">
        {showEmoji && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-20, -40, -60],
              scale: [0.5, 1.5, 1.8, 1],
              rotate: [-5, 8, -3, 0],
            }}
            exit={{ opacity: 0, y: -80, transition: { duration: 0.4 } }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.7, 1],
              ease: "easeOut",
            }}
          >
            <span className="text-2xl">{getCelebrationEmoji()}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sprinkling confetti for milestone celebrations - optimized for performance */}
      {showEmoji && streak % 7 === 0 && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${(i * 30) % 360}, 80%, 60%)`,
                top: "50%",
                left: "50%",
                willChange: "transform, opacity",
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos((i * Math.PI) / 6) * 80,
                y: Math.sin((i * Math.PI) / 6) * 80,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.2 + (i % 3) * 0.2,
                times: [0, 0.4, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default StreakAnimation;
