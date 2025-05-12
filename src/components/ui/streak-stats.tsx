import { CheckIn } from "@/types";
import {
  Flame,
  Calendar,
  BarChart2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { differenceInDays, format, isToday, parseISO } from "date-fns";
import { StreakCounter } from "@/components/ui/streak-milestone";

interface StreakStatsProps {
  streak: number;
  checkIns: CheckIn[];
  startDate: Date;
  completionRate: number;
}

export function StreakStats({
  streak,
  checkIns,
  startDate,
  completionRate,
}: StreakStatsProps) {
  // Calculate some additional stats
  const totalDays = differenceInDays(new Date(), startDate) + 1;
  const totalCheckIns = checkIns.length;
  const completedCheckIns = checkIns.filter((c) => c.completed).length;
  const missedCheckIns = checkIns.filter((c) => !c.completed).length;

  // Get most recent check-in
  const sortedCheckIns = [...checkIns].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latestCheckIn = sortedCheckIns[0];

  const calculateStreakPercentile = (currentStreak: number) => {
    // This would normally be calculated from actual data
    const benchmarks = {
      beginner: 3, // 25th percentile
      intermediate: 7, // 50th percentile
      advanced: 14, // 75th percentile
      expert: 30, // 95th percentile
    };

    if (currentStreak >= benchmarks.expert) return 95;
    if (currentStreak >= benchmarks.advanced) return 75;
    if (currentStreak >= benchmarks.intermediate) return 50;
    if (currentStreak >= benchmarks.beginner) return 25;
    return 10;
  };

  const streakPercentile = calculateStreakPercentile(streak);

  return (
    <div className="streak-stats space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <StreakCounter streak={streak} size="lg" animate={true} />

              {streakPercentile > 0 && (
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-800 border-amber-200"
                >
                  Top {streakPercentile}%
                </Badge>
              )}
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress to next milestone</span>
                <span>
                  {streak < 7
                    ? `${streak}/7 days`
                    : streak < 30
                    ? `${streak}/30 days`
                    : streak < 90
                    ? `${streak}/90 days`
                    : streak < 180
                    ? `${streak}/180 days`
                    : streak < 365
                    ? `${streak}/365 days`
                    : "1 year+"}
                </span>
              </div>
              <Progress
                value={
                  streak < 7
                    ? (streak / 7) * 100
                    : streak < 30
                    ? (streak / 30) * 100
                    : streak < 90
                    ? (streak / 90) * 100
                    : streak < 180
                    ? (streak / 180) * 100
                    : streak < 365
                    ? (streak / 365) * 100
                    : 100
                }
                className="h-2 bg-amber-100"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Check-in Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
                <span className="text-xl font-bold">{completedCheckIns}</span>
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-red-50 rounded-lg">
                <XCircle className="h-5 w-5 text-red-400 mb-1" />
                <span className="text-xl font-bold">{missedCheckIns}</span>
                <span className="text-xs text-muted-foreground">Missed</span>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Completion rate</span>
                <span>{Math.round(completionRate * 100)}%</span>
              </div>
              <Progress value={completionRate * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-purple-500" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Started</span>
              </div>
              <Badge variant="outline">
                {format(startDate, "MMM d, yyyy")}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Total days</span>
              </div>
              <span className="font-medium">{totalDays}</span>
            </div>

            {latestCheckIn && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {latestCheckIn.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm">Latest check-in</span>
                </div>
                <Badge
                  variant={latestCheckIn.completed ? "default" : "outline"}
                >
                  {isToday(new Date(latestCheckIn.date))
                    ? "Today"
                    : format(new Date(latestCheckIn.date), "MMM d")}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card mt-4">
        <div className="px-4 py-3 bg-muted/50">
          <h3 className="text-sm font-medium">Streak Visualization</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1">
            {checkIns.slice(-30).map((checkIn, i) => (
              <motion.div
                key={checkIn.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs ${
                  checkIn.completed
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                    : "bg-red-100 text-red-500"
                }`}
                title={`${format(new Date(checkIn.date), "MMM d")}: ${
                  checkIn.completed ? "Completed" : "Missed"
                }`}
              >
                {checkIn.completed ? "✓" : "✗"}
              </motion.div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Showing the last 30 check-ins
          </div>
        </div>
      </div>
    </div>
  );
}
