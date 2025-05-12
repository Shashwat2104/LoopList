import { useState, useEffect, useRef } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const completedButtonRef = useRef<HTMLButtonElement>(null);
  const missedButtonRef = useRef<HTMLButtonElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // Initial animation when component mounts
    const elements = containerRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.4)",
      }
    );

    // Animate streak milestone if present
    if (milestoneRef.current) {
      gsap.fromTo(
        milestoneRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          delay: 0.5,
        }
      );

      // Create pulsing effect for milestone
      gsap.to(milestoneRef.current, {
        boxShadow: "0 0 15px rgba(255, 197, 23, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }

    // Animate buttons with hover effects
    if (completedButtonRef.current) {
      completedButtonRef.current.addEventListener("mouseenter", () => {
        gsap.to(completedButtonRef.current, {
          scale: 1.05,
          y: -2,
          boxShadow: "0 10px 15px -3px rgba(255, 107, 0, 0.2)",
          duration: 0.2,
        });
      });

      completedButtonRef.current.addEventListener("mouseleave", () => {
        gsap.to(completedButtonRef.current, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 6px -1px rgba(255, 107, 0, 0.1)",
          duration: 0.2,
        });
      });
    }

    // Animate the motivational quote with typewriter effect
    if (quoteRef.current) {
      const text = quoteRef.current.textContent || "";
      quoteRef.current.textContent = "";

      const chars = text.split("");
      chars.forEach((char, index) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.opacity = "0";
        quoteRef.current?.appendChild(charSpan);

        gsap.to(charSpan, {
          opacity: 1,
          duration: 0.05,
          delay: 0.8 + index * 0.03,
        });
      });
    }
  }, [loop.id]);

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
      // Animation for check-in button press
      if (completed && completedButtonRef.current) {
        gsap
          .timeline()
          .to(completedButtonRef.current, {
            scale: 0.95,
            duration: 0.1,
          })
          .to(completedButtonRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
          .to(completedButtonRef.current, {
            scale: 1,
            duration: 0.2,
          });
      } else if (!completed && missedButtonRef.current) {
        gsap
          .timeline()
          .to(missedButtonRef.current, {
            scale: 0.95,
            duration: 0.1,
          })
          .to(missedButtonRef.current, {
            scale: 1,
            duration: 0.2,
          });
      }

      await checkInLoop(loop.id, date, completed);
      setCheckInPopoverOpen(false);

      if (completed) {
        createStreakConfetti();
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

  // Create confetti effect using GSAP for successful check-in
  const createStreakConfetti = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Create confetti particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "streak-confetti";

      // Randomize particle properties
      const size = Math.random() * 10 + 5;
      const color = [
        "#FF5757", // red
        "#FFD557", // yellow
        "#57FF8D", // green
        "#57ADFF", // blue
        "#CB57FF", // purple
        "#FF914D", // orange
      ][Math.floor(Math.random() * 6)];

      // Style the particle
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = `${Math.random() > 0.5 ? "50%" : "0"}`;
      particle.style.zIndex = "100";
      particle.style.pointerEvents = "none";

      // Position at the center
      particle.style.left = `${containerRect.width / 2}px`;
      particle.style.top = `${containerRect.height / 2}px`;

      container.appendChild(particle);

      // Animate the particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * containerRect.width,
        y: (Math.random() - 0.5) * containerRect.height,
        opacity: 0,
        rotation: Math.random() * 360,
        duration: 1 + Math.random() * 2,
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
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
    <div ref={containerRef} className="flex flex-col items-center relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <img
            src="/images/celebration.svg"
            alt="Celebration"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full opacity-75 animate-float"
          />
        </div>
      )}

      <h3 className="text-xl font-medium mb-2 animate-in">
        Check in for your loop
      </h3>

      {streakMilestone && (
        <div
          ref={milestoneRef}
          className="flex items-center gap-2 mb-3 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full animate-in"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">{streakMilestone.text}</span>
        </div>
      )}

      <div
        ref={quoteRef}
        className="text-sm text-center text-muted-foreground mb-4 animate-in"
      >
        {motivationalQuote}
      </div>

      <Popover open={checkInPopoverOpen} onOpenChange={setCheckInPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[240px] animate-in">
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

      <div className="flex items-center gap-4 mt-6 animate-in">
        <Button
          ref={missedButtonRef}
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
          ref={completedButtonRef}
          size="lg"
          className="bg-gradient-to-r from-flame-500 to-flame-600 hover:from-flame-600 hover:to-flame-700 shadow-md"
          onClick={() => handleCheckIn(true)}
          disabled={isSubmitting}
        >
          <CheckIcon className="mr-2 h-5 w-5" />
          Completed
        </Button>
      </div>

      {/* Streak visualization */}
      {loop.currentStreak > 0 && (
        <div ref={streakRef} className="mt-8 w-full max-w-xs animate-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Current Streak</span>
            <div className="flex items-center">
              <Flame size={14} className="text-flame-500 mr-1" />
              <span className="text-flame-600 font-bold">
                {loop.currentStreak} days
              </span>
            </div>
          </div>

          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-flame-400 to-flame-600 rounded-full"
              style={{
                width: `${Math.min(100, (loop.currentStreak / 100) * 100)}%`,
                transition: "width 1s ease-out",
              }}
            />
          </div>

          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0</span>
            <span>30</span>
            <span>60</span>
            <span>90</span>
            <span>100+</span>
          </div>
        </div>
      )}
    </div>
  );
}
