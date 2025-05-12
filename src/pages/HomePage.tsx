import React from "react";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";
import CommunitySection from "@/components/home/community-section";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CommunitySection />

      {/* Call to Action Section */}
      <section className="py-20 bg-flame-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Building Better Habits?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are building micro-habits and improving
            their lives with LoopList's streak tracking and community features.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-flame-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Get Started For Free
          </a>
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
                    <a
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="hover:text-white transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#blog"
                      className="hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#forum"
                      className="hover:text-white transition-colors"
                    >
                      Forum
                    </a>
                  </li>
                  <li>
                    <a
                      href="#support"
                      className="hover:text-white transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms
                    </a>
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
              <a href="#twitter" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a
                href="#instagram"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#facebook"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
