import { useState } from "react";
import { Loop, CheckIn } from "@/types";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StreakCalendarProps {
  loop: Loop;
  checkIns: CheckIn[];
}

export default function StreakCalendar({
  loop,
  checkIns,
}: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToPreviousMonth = () => {
    setDirection(-1);
    setAnimate(true);
    setTimeout(() => {
      setCurrentMonth(subMonths(currentMonth, 1));
      setAnimate(false);
    }, 200);
  };

  const goToNextMonth = () => {
    setDirection(1);
    setAnimate(true);
    setTimeout(() => {
      setCurrentMonth(addMonths(currentMonth, 1));
      setAnimate(false);
    }, 200);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate day stats
  const totalDaysInMonth = daysInMonth.length;
  const completedDaysInMonth = checkIns.filter(
    (ci) => ci.completed && isSameMonth(new Date(ci.date), currentMonth)
  ).length;
  const completionRate =
    totalDaysInMonth > 0
      ? Math.round((completedDaysInMonth / totalDaysInMonth) * 100)
      : 0;

  // Get the longest streak in the current month
  const getMonthlyStreak = () => {
    let currentStreak = 0;
    let maxStreak = 0;

    // Sort days in ascending order
    const sortedCheckIns = [...checkIns]
      .filter((ci) => isSameMonth(new Date(ci.date), currentMonth))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (const checkIn of sortedCheckIns) {
      if (checkIn.completed) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return maxStreak;
  };

  const monthlyStreak = getMonthlyStreak();

  return (
    <div className="streak-calendar bg-white rounded-lg p-4 border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">Streak Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Track your daily progress
          </p>
        </div>
        <div className="flex space-x-1">
          <Button size="sm" variant="ghost" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" disabled>
            <CalendarIcon className="h-4 w-4 mr-2" />
            {format(currentMonth, "MMMM yyyy")}
          </Button>
          <Button size="sm" variant="ghost" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-flame-500">
              {completedDaysInMonth}
            </span>
            <span className="text-xs text-muted-foreground">
              Days Completed
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-500">
              {monthlyStreak}
            </span>
            <span className="text-xs text-muted-foreground">
              Longest Streak
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-emerald-500">
              {completionRate}%
            </span>
            <span className="text-xs text-muted-foreground">
              Completion Rate
            </span>
          </div>
        </div>
      </div>

      <div className="text-center grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentMonth.toString()}
          initial={{
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
          }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {Array.from({ length: new Date(monthStart).getDay() }).map((_, i) => (
            <div key={`empty-start-${i}`} className="h-10 rounded-md"></div>
          ))}

          {daysInMonth.map((day, i) => {
            // Find if there's a check-in for this day
            const checkIn = checkIns.find((ci) =>
              isSameDay(new Date(ci.date), day)
            );

            // Check for streak (3 or more consecutive completed days)
            const isPartOfStreak = (index: number) => {
              if (!checkIn?.completed) return false;

              // Check previous days
              let streakCount = 1;
              let prevIndex = index - 1;
              while (prevIndex >= 0) {
                const prevDay = daysInMonth[prevIndex];
                const prevCheckIn = checkIns.find((ci) =>
                  isSameDay(new Date(ci.date), prevDay)
                );
                if (prevCheckIn?.completed) {
                  streakCount++;
                  prevIndex--;
                } else {
                  break;
                }
              }

              // Check following days
              let nextIndex = index + 1;
              while (nextIndex < daysInMonth.length) {
                const nextDay = daysInMonth[nextIndex];
                const nextCheckIn = checkIns.find((ci) =>
                  isSameDay(new Date(ci.date), nextDay)
                );
                if (nextCheckIn?.completed) {
                  streakCount++;
                  nextIndex++;
                } else {
                  break;
                }
              }

              return streakCount >= 3;
            };

            const dayHasStreak = isPartOfStreak(i);

            return (
              <motion.div
                key={day.toString()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className={cn(
                  "h-10 rounded-md flex items-center justify-center relative",
                  isToday(day) && "border-2 border-flame-300",
                  checkIn?.completed &&
                    (dayHasStreak
                      ? "bg-gradient-to-b from-flame-400 to-flame-500 text-white"
                      : "bg-flame-100 text-flame-700"),
                  checkIn &&
                    !checkIn.completed &&
                    "bg-gray-100 text-gray-400 line-through",
                  !checkIn && "hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    isToday(day) && !checkIn && "font-bold"
                  )}
                >
                  {format(day, "d")}
                </span>

                {checkIn?.completed && dayHasStreak && (
                  <div className="absolute -top-1 -right-1">
                    <Flame className="h-3 w-3 text-amber-400" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {Array.from({ length: 6 - new Date(monthEnd).getDay() }).map(
            (_, i) => (
              <div key={`empty-end-${i}`} className="h-10 rounded-md"></div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground border-t pt-3">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-flame-400 rounded-sm mr-2"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-100 rounded-sm mr-2"></div>
            <span>Missed</span>
          </div>
        </div>
        <div className="flex items-center">
          <Flame className="h-3 w-3 text-amber-400 mr-1" />
          <span>Streak</span>
        </div>
      </div>
    </div>
  );
}
