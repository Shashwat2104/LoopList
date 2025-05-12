import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckInAnimationProps {
  onComplete?: () => void;
}

export const CheckInAnimation: React.FC<CheckInAnimationProps> = ({
  onComplete,
}) => {
  const handleAnimationComplete = () => {
    if (onComplete) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Background pulse - smoother animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 2],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          times: [0, 0.5, 1],
        }}
      />

      {/* Inner circle with check mark - improved bounce */}
      <motion.div
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white"
        style={{ willChange: "transform" }}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 0.6,
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.div
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Check size={28} strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Particle effects - optimized for smoother animation */}
      {[...Array(8)].map((_, i) => {
        const angle = i * (Math.PI / 4);
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-500"
            style={{
              top: "50%",
              left: "50%",
              willChange: "transform, opacity",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * 50,
              y: Math.sin(angle) * 50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              times: [0, 0.4, 1],
              delay: 0.05,
            }}
          />
        );
      })}

      {/* Success text - smoother fade in */}
      <motion.div
        className="absolute bottom-[-3rem] text-green-600 font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
      >
        Streak extended!
      </motion.div>
    </div>
  );
};

// Component for when a user completes a milestone
export const MilestoneCheckInAnimation: React.FC<
  CheckInAnimationProps & { milestone: number }
> = ({ onComplete, milestone }) => {
  const handleAnimationComplete = () => {
    if (onComplete) {
      setTimeout(onComplete, 800);
    }
  };

  // Get milestone text
  const getMilestoneText = () => {
    if (milestone >= 100) return "INCREDIBLE!";
    if (milestone >= 50) return "AMAZING!";
    if (milestone >= 30) return "FANTASTIC!";
    if (milestone >= 21) return "GREAT STREAK!";
    if (milestone >= 14) return "TWO WEEKS!";
    if (milestone >= 7) return "ONE WEEK!";
    return "STREAK MILESTONE!";
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full py-10">
      {/* Milestone badge - smoother animation */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-flame-600 text-white"
        style={{ willChange: "transform" }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 18,
          duration: 0.7,
          times: [0, 0.6, 1],
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="text-lg font-bold"
        >
          {milestone}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="text-sm"
        >
          DAYS
        </motion.div>
      </motion.div>

      {/* Celebration text - smoother reveal */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.4,
          ease: "easeOut",
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="text-2xl font-bold text-flame-600">
          {getMilestoneText()}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          You've been consistent for {milestone} days
        </div>
      </motion.div>

      {/* Confetti - optimized for smoother animation */}
      {[...Array(24)].map((_, i) => {
        // Create a deterministic but varied pattern
        const angle = (i / 24) * Math.PI * 2;
        const distance = 90 + (i % 5) * 20;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: `hsl(${(i * 15) % 360}, 80%, 60%)`,
              top: "50%",
              left: "50%",
              willChange: "transform, opacity",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 1.2 + (i % 5) * 0.1,
              ease: "easeOut",
              delay: 0.1 + (i % 7) * 0.03,
              times: [0, 0.4, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default CheckInAnimation;
