import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LoopProvider } from "@/context/LoopContext";

import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import EnhancedAuthPage from "./pages/EnhancedAuthPage";
import DashboardPage from "./pages/DashboardPage";
import ExplorePage from "./pages/ExplorePage";
import LoopDetailPage from "./pages/LoopDetailPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import { ToastProvider } from "@/components/ui/toast-provider";
import { PageTransition } from "@/components/ui/page-transition";

const queryClient = new QueryClient();

// AnimatedRoutes component to wrap all routes with animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <PageTransition>
            <Index />
          </PageTransition>
        }
      />
      <Route
        path="/home"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />
      <Route path="/login" element={<EnhancedAuthPage />} />
      <Route
        path="/dashboard"
        element={
          <PageTransition>
            <DashboardPage />
          </PageTransition>
        }
      />
      <Route
        path="/explore"
        element={
          <PageTransition>
            <ExplorePage />
          </PageTransition>
        }
      />
      <Route
        path="/loop/:id"
        element={
          <PageTransition>
            <LoopDetailPage />
          </PageTransition>
        }
      />
      <Route
        path="*"
        element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        }
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoopProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ToastProvider
              position="bottom-right"
              expand={true}
              richColors={true}
              closeButton={true}
              visibleToasts={3}
            >
              <AnimatedRoutes />
            </ToastProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LoopProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
