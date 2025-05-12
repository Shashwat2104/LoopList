import { useState, useEffect } from "react";
import { Loop } from "@/types";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  XIcon,
  CalendarIcon,
  Flame,
  Star,
  Award,
  Medal,
  Sparkles,
} from "lucide-react";
import { useLoops } from "@/context/LoopContext";
import { format, isToday, isSameDay, differenceInDays } from "date-fns";
import { toast } from "@/components/ui/sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DailyCheckInProps {
  loop: Loop;
}

// Motivational quotes for achievements
const MOTIVATIONAL_QUOTES = [
  "Every day is a new opportunity to build your streak!",
  "Consistency is the key to transformation!",
  "Small steps each day lead to big results!",
  "Keep going! Your future self will thank you.",
  "Success is the sum of small efforts repeated daily.",
];

export default function DailyCheckIn({ loop }: DailyCheckInProps) {
  const { checkInLoop, getCheckInsForLoop } = useLoops();
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInPopoverOpen, setCheckInPopoverOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");

  // Get all check-ins for this loop
  const checkIns = getCheckInsForLoop(loop.id);

  // Find if there's a check-in for the selected date
  const todayCheckIn = checkIns.find(
    (ci) => new Date(ci.date).toDateString() === date.toDateString()
  );

  // Get a random motivational quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setMotivationalQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  }, []);

  const handleCheckIn = async (completed: boolean) => {
    setIsSubmitting(true);

    try {
      await checkInLoop(loop.id, date, completed);
      setCheckInPopoverOpen(false);

      if (completed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        toast.success("Great job, streak continued!");
      } else {
        toast.success("Check-in recorded. Keep going tomorrow!");
      }
    } catch (error) {
      toast.error("Failed to check in");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate streak milestone based on current streak
  const getStreakMilestone = () => {
    const streak = loop.currentStreak;
    if (streak >= 365)
      return {
        icon: <Award className="h-6 w-6 text-amber-500" />,
        text: "1 Year Achievement!",
      };
    if (streak >= 180)
      return {
        icon: <Medal className="h-6 w-6 text-purple-500" />,
        text: "6 Month Milestone!",
      };
    if (streak >= 90)
      return {
        icon: <Medal className="h-6 w-6 text-indigo-500" />,
        text: "3 Month Milestone!",
      };
    if (streak >= 30)
      return {
        icon: <Star className="h-6 w-6 text-blue-500" />,
        text: "1 Month Streak!",
      };
    if (streak >= 7)
      return {
        icon: <Flame className="h-6 w-6 text-orange-500" />,
        text: "1 Week Streak!",
      };
    return null;
  };

  const streakMilestone = getStreakMilestone();

  // Calendar renderer to highlight dates with check-ins
  const renderCalendarDay = (day: Date) => {
    const isCheckInDay = checkIns.some((ci) =>
      isSameDay(new Date(ci.date), day)
    );

    const checkIn = checkIns.find((ci) => isSameDay(new Date(ci.date), day));

    return (
      <div
        className={cn(
          "relative",
          checkIn?.completed && "bg-flame-100 rounded-full text-flame-700",
          checkIn &&
            !checkIn.completed &&
            "bg-gray-100 rounded-full text-gray-700"
        )}
      >
        {day.getDate()}
        {checkIn?.completed && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="h-1 w-1 bg-flame-500 rounded-full" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <img
            src="/images/celebration.svg"
            alt="Celebration"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full opacity-75 animate-float"
          />
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: -20,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: ["0%", "100%"],
                opacity: [1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#FF5757",
                  "#FFD557",
                  "#57FF8D",
                  "#57ADFF",
                  "#CB57FF",
                ][Math.floor(Math.random() * 5)],
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      )}

      <h3 className="text-xl font-medium mb-2">Check in for your loop</h3>
      {streakMilestone && (
        <div className="flex items-center gap-2 mb-3 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">{streakMilestone.text}</span>
        </div>
      )}

      <div className="text-sm text-center text-muted-foreground mb-4">
        {motivationalQuote}
      </div>

      <Popover open={checkInPopoverOpen} onOpenChange={setCheckInPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[240px]">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isToday(date) ? "Today" : format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            initialFocus
            components={{
              Day: ({ date: day, ...props }) => (
                <button {...props}>{renderCalendarDay(day)}</button>
              ),
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-4 mt-6">
        <Button
          size="lg"
          variant="outline"
          className="border-2 hover:bg-red-50"
          onClick={() => handleCheckIn(false)}
          disabled={isSubmitting}
        >
          <XIcon className="mr-2 h-5 w-5 text-red-500" />
          Missed today
        </Button>

        <Button
          size="lg"
          className={cn(
            "bg-gradient-to-r from-flame-500 to-flame-600 hover:from-flame-600 hover:to-flame-700",
            todayCheckIn?.completed && "animate-celebration"
          )}
          onClick={() => handleCheckIn(true)}
          disabled={isSubmitting}
        >
          <CheckIcon className="mr-2 h-5 w-5" />
          Completed
        </Button>
      </div>

      {/* Streak visualization */}
      {loop.currentStreak > 0 && (
        <div className="mt-6 w-full max-w-sm">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Current streak</span>
            <div className="flex items-center text-flame-600">
              <Flame size={14} className="mr-1" />
              <span>{loop.currentStreak} days</span>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-flame-500 to-orange-500"
              style={{
                width: `${Math.min(100, (loop.currentStreak / 100) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 text-sm">
        {todayCheckIn ? (
          todayCheckIn.completed ? (
            <div className="text-flame-600 font-medium flex items-center gap-1 bg-flame-50 px-3 py-1.5 rounded-full">
              <CheckIcon size={16} />
              <span>Checked in for {format(date, "MMM d")}</span>
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full">
              <XIcon size={16} />
              <span>Marked as missed for {format(date, "MMM d")}</span>
            </div>
          )
        ) : isToday(date) ? (
          <span>You haven't checked in for today yet</span>
        ) : (
          <span>No check-in recorded for this date</span>
        )}
      </div>

      {/* Show achievement image for milestones */}
      {loop.currentStreak >= 7 && (
        <div className="mt-6 w-24 h-24 flex items-center justify-center">
          <img
            src={
              loop.currentStreak >= 30
                ? "/images/unlock-achievements.svg"
                : "/images/streak-fire.svg"
            }
            alt="Achievement"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
