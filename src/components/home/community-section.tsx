import React from "react";
import { motion } from "framer-motion";

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Community Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <img
              src="/images/community.svg"
              alt="LoopList Community"
              className="w-full h-auto max-w-md mx-auto"
            />
          </motion.div>

          {/* Community Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2 lg:pl-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Join a Community of Habit Builders
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Habits stick better when others are watching. Share your progress,
              get encouragement, and stay motivated together.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 mr-4">
                  <img
                    src="/images/streak-fire.svg"
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Public Commitment Boards
                  </h3>
                  <p className="text-gray-600">
                    Make your habits public for added accountability and share
                    progress with friends.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 mr-4">
                  <img
                    src="/images/social-share.svg"
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Social Challenges
                  </h3>
                  <p className="text-gray-600">
                    Compete with friends or join group challenges to stay
                    motivated.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 mr-4">
                  <img
                    src="/images/celebration.svg"
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Celebration Sharing
                  </h3>
                  <p className="text-gray-600">
                    Share your milestone achievements and celebrate community
                    wins.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah J.</h4>
                    <p className="text-gray-600 mt-1">
                      "Having friends see my streaks makes me way more likely to
                      stick with it. I'm on a 45-day meditation streak now
                      thanks to LoopList's community features!"
                    </p>
                    <div className="flex items-center mt-3">
                      <div className="flex items-center text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        3 months ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
