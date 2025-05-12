import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedText from "@/components/ui/animated-text";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10"
          >
            <div className="mb-6">
              <AnimatedText
                text="Build Better Habits"
                effect="staggered"
                duration={1.5}
                tag="h1"
                className="text-4xl md:text-5xl font-bold text-gray-900"
              />
              <AnimatedText
                text="One Streak at a Time"
                effect="slideUp"
                duration={1.2}
                delay={0.5}
                tag="span"
                className="text-4xl md:text-5xl font-bold text-flame-500 block mt-2"
              />
            </div>

            <AnimatedText
              text="LoopList helps you create and maintain micro-habits through visual streaks, public accountability, and a supportive community."
              effect="fadeIn"
              duration={1}
              delay={1.5}
              staggerAmount={0.01}
              tag="p"
              className="text-xl text-gray-600 mb-8"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-flame-500 to-flame-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Start For Free
              </motion.button>
              <motion.button
                onClick={() => navigate("/explore")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-flame-600 border border-flame-200 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                Learn More
              </motion.button>
            </div>

            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/men/${
                        n + 10
                      }.jpg`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="font-semibold text-gray-900">
                  Join 2,000+ users
                </div>
                <div className="text-sm text-gray-600">
                  Building better habits together
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <img
              src="/images/hero-image.svg"
              alt="LoopList Streak Calendar"
              className="w-full h-auto max-w-xl mx-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-30">
        <img src="/images/streak-fire.svg" alt="" className="w-32 h-32" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-30">
        <img src="/images/micro-habit.svg" alt="" className="w-48 h-48" />
      </div>
    </section>
  );
};

export default HeroSection;
