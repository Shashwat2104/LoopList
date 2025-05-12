import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import MainNav from "@/components/layout/MainNav";
import AuthTabs from "@/components/auth/AuthTabs";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from query params or default to dashboard
  const from = new URLSearchParams(location.search).get("from") || "/dashboard";

  useEffect(() => {
    // Only redirect if user is loaded and authenticated
    if (!isLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, isLoading, from]);

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <SimplePageTransition>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <div className="flex-1 flex items-center justify-center">
            <AnimatedContainer
              variant="pulse"
              className="text-muted-foreground"
            >
              Loading...
            </AnimatedContainer>
          </div>
        </div>
      </SimplePageTransition>
    );
  }

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AnimatedContainer variant="fadeInDown" duration="normal">
              <AuthTabs />
            </AnimatedContainer>

            <AnimatedContainer
              variant="fadeIn"
              delay="medium"
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </AnimatedContainer>
          </div>
        </main>
      </div>
    </SimplePageTransition>
  );
}
