import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "relative flex flex-col items-center p-6 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="w-16 h-16 mb-4">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
