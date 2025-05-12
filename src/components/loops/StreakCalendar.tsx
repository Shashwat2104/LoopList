import { useState, useRef, useEffect } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface StreakCalendarProps {
  loop: Loop;
  checkIns: CheckIn[];
}

export default function StreakCalendar({
  loop,
  checkIns = [],
}: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState(0);

  const calendarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animations for the calendar
  useGSAP(() => {
    if (!calendarRef.current) return;

    // Initial animation for the calendar
    gsap.from(calendarRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Animate stats counters
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll(".stat-value");
      gsap.from(statElements, {
        textContent: 0,
        duration: 1.5,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.2,
        onUpdate: function () {
          this.targets().forEach((target: HTMLElement) => {
            if (target.classList.contains("percent")) {
              target.textContent =
                Math.round(parseFloat(target.textContent || "0")) + "%";
            }
          });
        },
      });
    }

    // Animate the flame effect for streak days
    dayRefs.current.forEach((dayRef, index) => {
      if (dayRef && dayRef.classList.contains("streak-day")) {
        // Create flame effect
        gsap.to(dayRef, {
          boxShadow: "0 0 15px rgba(255, 107, 53, 0.7)",
          repeat: -1,
          yoyo: true,
          duration: 1 + (index % 3) * 0.2,
          ease: "sine.inOut",
        });
      }
    });
  }, [currentMonth, checkIns]);

  // Animation for month change
  const animateMonthChange = (newMonth: Date) => {
    if (!calendarRef.current) return;

    const timeline = gsap.timeline();

    // Fade out
    timeline.to(".calendar-grid", {
      opacity: 0,
      x: direction > 0 ? -30 : 30,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        setCurrentMonth(newMonth);
      },
    });

    // Fade in
    timeline.to(".calendar-grid", {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: "power1.out",
      delay: 0.1,
    });

    // Animate new stats
    timeline.add(() => {
      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll(".stat-value");
        gsap.from(statElements, {
          textContent: 0,
          duration: 1,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          stagger: 0.1,
          onUpdate: function () {
            this.targets().forEach((target: HTMLElement) => {
              if (target.classList.contains("percent")) {
                target.textContent =
                  Math.round(parseFloat(target.textContent || "0")) + "%";
              }
            });
          },
        });
      }
    });
  };

  const goToPreviousMonth = () => {
    setDirection(-1);
    animateMonthChange(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setDirection(1);
    animateMonthChange(addMonths(currentMonth, 1));
  };

  // Reset refs when month changes
  useEffect(() => {
    dayRefs.current = [];
  }, [currentMonth]);

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

  // Helper to determine if a day is part of a streak
  const isPartOfStreak = (day: Date) => {
    if (!checkIns) return false;

    const dayCheckIn = checkIns.find((ci) => isSameDay(new Date(ci.date), day));

    if (!dayCheckIn?.completed) return false;

    // Check for consecutive completed days
    let streakCount = 1;
    let currentDate = new Date(day);

    // Check previous days
    for (let i = 1; i <= 6; i++) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - i);

      const prevCheckIn = checkIns.find((ci) =>
        isSameDay(new Date(ci.date), prevDate)
      );

      if (prevCheckIn?.completed) {
        streakCount++;
      } else {
        break;
      }
    }

    // Check following days
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + i);

      const nextCheckIn = checkIns.find((ci) =>
        isSameDay(new Date(ci.date), nextDate)
      );

      if (nextCheckIn?.completed) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount >= 3;
  };

  return (
    <div
      ref={calendarRef}
      className="streak-calendar bg-white rounded-lg p-4 border"
    >
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

      <div ref={statsRef} className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <span className="stat-value text-2xl font-bold text-flame-500">
              {completedDaysInMonth}
            </span>
            <span className="text-xs text-muted-foreground">
              Days Completed
            </span>
          </div>
          <div className="flex flex-col">
            <span className="stat-value text-2xl font-bold text-blue-500">
              {monthlyStreak}
            </span>
            <span className="text-xs text-muted-foreground">
              Longest Streak
            </span>
          </div>
          <div className="flex flex-col">
            <span className="stat-value percent text-2xl font-bold text-emerald-500">
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

      <div className="calendar-grid grid grid-cols-7 gap-1">
        {Array.from({ length: new Date(monthStart).getDay() }).map((_, i) => (
          <div key={`empty-start-${i}`} className="h-10 rounded-md"></div>
        ))}

        {daysInMonth.map((day, i) => {
          // Find if there's a check-in for this day
          const checkIn = checkIns.find((ci) =>
            isSameDay(new Date(ci.date), day)
          );

          const dayHasStreak = isPartOfStreak(day);

          return (
            <div
              key={day.toString()}
              ref={(el) => (dayRefs.current[i] = el)}
              className={cn(
                "h-10 rounded-md flex items-center justify-center relative",
                isToday(day) && "border-2 border-flame-300",
                checkIn?.completed &&
                  dayHasStreak &&
                  "streak-day bg-gradient-to-b from-flame-400 to-flame-500 text-white",
                checkIn?.completed &&
                  !dayHasStreak &&
                  "bg-flame-100 text-flame-700",
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

              {/* Flame icon for streak days */}
              {checkIn?.completed && dayHasStreak && (
                <div className="absolute -top-1 -right-1 text-yellow-400">
                  <Flame size={12} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
