import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";
import CommunitySection from "@/components/home/community-section";
import AnimatedText from "@/components/ui/animated-text";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CommunitySection />

      {/* Call to Action Section */}
      <section className="py-20 bg-flame-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedText
              text="Ready to Start Building Better Habits?"
              effect="staggered"
              duration={1}
              tag="h2"
              className="text-4xl font-bold mb-6"
            />

            <AnimatedText
              text="Join thousands of users who are building micro-habits and improving their lives with LoopList's streak tracking and community features."
              effect="fadeIn"
              duration={1}
              delay={0.5}
              staggerAmount={0.01}
              tag="p"
              className="text-xl mb-8 mx-auto"
            />

            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-flame-600 font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <img
                  src="/favicon.svg"
                  alt="LoopList"
                  className="w-10 h-10 mr-3"
                />
                <span className="text-white font-bold text-xl">LoopList</span>
              </div>
              <p className="mt-4 max-w-xs">
                Build better habits through visual streaks, public
                accountability, and community support.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/")}
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/login")}
                      className="hover:text-white transition-colors"
                    >
                      Get Started
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/explore")}
                      className="hover:text-white transition-colors"
                    >
                      Explore
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/explore")}
                      className="hover:text-white transition-colors"
                    >
                      Public Loops
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/login")}
                      className="hover:text-white transition-colors"
                    >
                      Login / Signup
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">About</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/")}
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LoopList. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <button className="hover:text-white transition-colors">
                Terms
              </button>
              <button className="hover:text-white transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
