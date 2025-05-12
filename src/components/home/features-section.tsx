import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "../ui/feature-card";

const FEATURES = [
  {
    title: "Track Your Streaks",
    description:
      "Visualize your habit-building journey with satisfying streak counters and fire animations.",
    icon: "/images/streak-fire.svg",
  },
  {
    title: "Connect Your Habits",
    description:
      "Create chain reactions of good habits and visualize your progress over time.",
    icon: "/images/streak-chain.svg",
  },
  {
    title: "Celebrate Achievements",
    description:
      "Earn badges and rewards as you reach milestones in your habit journey.",
    icon: "/images/celebration.svg",
  },
  {
    title: "Share With Friends",
    description:
      "Make your habits public and share your progress with friends for accountability.",
    icon: "/images/social-share.svg",
  },
  {
    title: "Complete Daily Habits",
    description:
      "Check off your daily micro-habits with satisfying animations and progress tracking.",
    icon: "/images/habit-check.svg",
  },
  {
    title: "Focus on Micro-Habits",
    description:
      "Break down big goals into small, daily actionable steps that compound over time.",
    icon: "/images/micro-habit.svg",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Features That Make Habit-Building Fun
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LoopList turns habit tracking into a social, visually rewarding
            experience that keeps you motivated and accountable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-flame-500 to-flame-600 text-white font-medium rounded-lg text-lg hover:from-flame-600 hover:to-flame-700 focus:ring-4 focus:ring-flame-400 transition-all"
          >
            Start Building Habits Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
