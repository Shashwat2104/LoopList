import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoops } from "@/context/LoopContext";
import { useAuth } from "@/context/AuthContext";
import MainNav from "@/components/layout/MainNav";
import DailyCheckIn from "@/components/loops/DailyCheckIn";
import StreakCalendar from "@/components/loops/StreakCalendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Copy, Calendar, BarChart3, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SimplePageTransition } from "@/components/ui/page-transition";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function LoopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getLoopById, cheerLoop, cloneLoop, getCheckInsForLoop } = useLoops();
  const { user } = useAuth();
  const navigate = useNavigate();

  const loop = id ? getLoopById(id) : undefined;
  const checkIns = id ? getCheckInsForLoop(id) : [];

  // Redirect if loop not found
  useEffect(() => {
    if (!loop) {
      navigate("/dashboard");
    }
  }, [loop, navigate]);

  if (!loop) return null;

  // Check if the current user owns this loop
  const isOwner = user && user.id === loop.userId;

  // User can only check in if they own the loop
  const canCheckIn = isOwner;

  // Public loops can be viewed by anyone, private loops only by their owners
  const canViewLoop = loop.visibility === "public" || isOwner;

  if (!canViewLoop) {
    return (
      <SimplePageTransition>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-1 container py-16 text-center">
            <AnimatedContainer variant="fadeIn">
              <h1 className="text-3xl font-bold mb-4">Private Loop</h1>
              <p className="text-muted-foreground mb-8">
                This loop is private and can only be viewed by its creator.
              </p>
              <Button onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </AnimatedContainer>
          </main>
        </div>
      </SimplePageTransition>
    );
  }

  return (
    <SimplePageTransition>
      <div className="min-h-screen flex flex-col">
        <MainNav />

        <main className="flex-1 container py-8">
          <AnimatedContainer variant="fadeIn">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </AnimatedContainer>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Loop details */}
            <div>
              <AnimatedContainer variant="fadeInLeft">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{loop.emoji || "🔄"}</div>
                  <div>
                    <h1 className="text-3xl font-bold">{loop.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          loop.visibility === "public" ? "default" : "outline"
                        }
                      >
                        {loop.visibility === "public" ? "Public" : "Private"}
                      </Badge>
                      <Badge variant="secondary">{loop.frequency}</Badge>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>

              <AnimatedContainer
                variant="fadeInLeft"
                delay="small"
                className="mb-8"
              >
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Current Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center">
                        <span className="mr-1">🔥</span> {loop.currentStreak}{" "}
                        days
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Longest Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loop.longestStreak} days
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Completion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Math.round(loop.completionRate * 100)}%
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedContainer>

              {/* Check-in UI (only for the loop owner) */}
              {canCheckIn && (
                <AnimatedContainer
                  variant="fadeInUp"
                  delay="medium"
                  className="mb-8"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <DailyCheckIn loop={loop} />
                    </CardContent>
                  </Card>
                </AnimatedContainer>
              )}

              {/* Social actions */}
              {!isOwner && (
                <AnimatedContainer variant="fadeIn" delay="large">
                  <Card>
                    <CardHeader>
                      <CardTitle>Support This Loop</CardTitle>
                      <CardDescription>
                        Cheer on or clone this loop to try it yourself
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => cheerLoop(loop.id)}
                        disabled={!user}
                      >
                        <Heart className="mr-2 h-4 w-4 text-flame-500" />
                        Cheer ({loop.cheers})
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => cloneLoop(loop.id)}
                        disabled={!user}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Clone This Loop
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedContainer>
              )}
            </div>

            {/* Streak calendar */}
            <AnimatedContainer variant="fadeInRight" delay="medium">
              <StreakCalendar loop={loop} checkIns={checkIns} />
            </AnimatedContainer>
          </div>
        </main>
      </div>
    </SimplePageTransition>
  );
}
