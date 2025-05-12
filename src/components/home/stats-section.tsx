import React from "react";
import { motion } from "framer-motion";

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Stats Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Track Your Progress with Visual Stats
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See your habit-building progress at a glance with beautiful charts
              and satisfying streak counters that keep you motivated.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-flame-500 text-3xl font-bold mb-2">
                  87%
                </div>
                <div className="text-gray-700">Average Habit Completion</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-flame-500 text-3xl font-bold mb-2">
                  32 Days
                </div>
                <div className="text-gray-700">Longest User Streak</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-flame-500 text-3xl font-bold mb-2">
                  3.5×
                </div>
                <div className="text-gray-700">Increased Consistency</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-flame-500 text-3xl font-bold mb-2">
                  12,000+
                </div>
                <div className="text-gray-700">Habits Tracked Monthly</div>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src="/images/streak-fire.svg"
                alt=""
                className="w-8 h-8 mr-3"
              />
              <p className="text-gray-700">
                <strong>The Streak Effect:</strong> Users with visible streaks
                are 3.5× more likely to maintain their habits.
              </p>
            </div>
          </motion.div>

          {/* Stats Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <img
                src="/images/progress-chart.svg"
                alt="LoopList Progress Chart"
                className="w-full h-auto"
              />

              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm">Current Streak</div>
                    <div className="flex items-center">
                      <img
                        src="/images/streak-fire.svg"
                        alt=""
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-xl font-bold text-flame-500">
                        12 Days
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-sm">Completion Rate</div>
                    <div className="text-xl font-bold text-flame-500">92%</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-sm">Next Milestone</div>
                    <div className="text-xl font-bold text-gray-700">
                      14 Days
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <img
                  src="/images/unlock-achievements.svg"
                  alt="Achievements"
                  className="w-32 h-auto"
                />
                <div className="flex items-end">
                  <span className="text-sm text-gray-500 mr-2">Powered by</span>
                  <span className="text-flame-500 font-semibold">LoopList</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
