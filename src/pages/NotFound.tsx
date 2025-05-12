import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center p-8 rounded-lg">
          <AnimatedContainer variant="fadeInDown" className="mb-6">
            <h1 className="text-9xl font-bold text-primary/20">404</h1>
          </AnimatedContainer>

          <AnimatedContainer
            variant="fadeIn"
            delay="small"
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sorry, we couldn't find the page you were looking for. It might
              have been moved or deleted.
            </p>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeInUp" delay="medium" className="mt-8">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
          </AnimatedContainer>
        </div>
      </div>
    </SimplePageTransition>
  );
};

export default NotFound;
