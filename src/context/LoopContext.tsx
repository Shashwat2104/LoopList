import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Loop,
  CheckIn,
  LoopStatus,
  VisibilityType,
  FrequencyType,
  Reaction,
} from "@/types";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";

interface LoopContextType {
  loops: Loop[];
  publicLoops: Loop[];
  isLoading: boolean;
  createLoop: (loopData: Partial<Loop>) => Promise<void>;
  updateLoop: (id: string, loopData: Partial<Loop>) => Promise<void>;
  deleteLoop: (id: string) => Promise<void>;
  getLoopById: (id: string) => Loop | undefined;
  checkInLoop: (
    loopId: string,
    date: Date,
    completed: boolean
  ) => Promise<void>;
  cheerLoop: (loopId: string) => Promise<void>;
  cloneLoop: (loopId: string) => Promise<void>;
  getUserLoops: () => Loop[];
  getTrendingLoops: () => Loop[];
  getLoopOfTheDay: () => Loop | undefined;
  getCheckInsForLoop: (loopId: string) => CheckIn[];
  hasUserCheeredLoop: (loopId: string) => boolean;
}

const LoopContext = createContext<LoopContextType | undefined>(undefined);

// Sample data for demonstration
const sampleLoops: Loop[] = [
  {
    id: "1",
    title: "Read 10 pages",
    emoji: "📚",
    frequency: "daily",
    startDate: new Date(2023, 4, 1),
    visibility: "public",
    userId: "1",
    createdAt: new Date(2023, 4, 1),
    currentStreak: 7,
    longestStreak: 14,
    completionRate: 0.85,
    status: "active",
    cheers: 24,
    clones: 5,
  },
  {
    id: "2",
    title: "Morning meditation",
    emoji: "🧘‍♂️",
    frequency: "daily",
    startDate: new Date(2023, 3, 15),
    visibility: "public",
    userId: "2",
    createdAt: new Date(2023, 3, 15),
    currentStreak: 30,
    longestStreak: 30,
    completionRate: 0.95,
    status: "active",
    cheers: 42,
    clones: 12,
  },
  {
    id: "3",
    title: "No sugar after 7pm",
    emoji: "🍭",
    frequency: "daily",
    startDate: new Date(2023, 5, 10),
    visibility: "public",
    userId: "3",
    createdAt: new Date(2023, 5, 10),
    currentStreak: 4,
    longestStreak: 21,
    completionRate: 0.7,
    status: "active",
    cheers: 18,
    clones: 7,
  },
  {
    id: "4",
    title: "Workout",
    emoji: "💪",
    frequency: "3x-weekly",
    startDate: new Date(2023, 4, 20),
    visibility: "public",
    userId: "4",
    createdAt: new Date(2023, 4, 20),
    currentStreak: 3,
    longestStreak: 6,
    completionRate: 0.8,
    status: "active",
    cheers: 31,
    clones: 9,
  },
];

const sampleCheckIns: CheckIn[] = [];

// Generate some sample check-ins
sampleLoops.forEach((loop) => {
  const startDate = new Date(loop.startDate);
  const today = new Date();

  // Create a check-in for each day from start date to today
  let currentDate = new Date(startDate);

  while (currentDate <= today) {
    // 80% chance of completion for sample data
    const completed = Math.random() > 0.2;

    sampleCheckIns.push({
      id: `checkin-${loop.id}-${currentDate.toISOString()}`,
      loopId: loop.id,
      userId: loop.userId,
      date: new Date(currentDate),
      completed,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
});

export const LoopProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [loops, setLoops] = useState<Loop[]>([]);
  const [publicLoops, setPublicLoops] = useState<Loop[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(sampleCheckIns);
  const [userReactions, setUserReactions] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load loops from localStorage or use sample data
    const storedLoops = localStorage.getItem("loopListLoops");
    const initialLoops = storedLoops ? JSON.parse(storedLoops) : sampleLoops;

    setLoops(initialLoops);
    updatePublicLoops(initialLoops);

    const storedCheckIns = localStorage.getItem("loopListCheckIns");
    if (storedCheckIns) {
      setCheckIns(JSON.parse(storedCheckIns));
    }

    const storedReactions = localStorage.getItem("loopListReactions");
    if (storedReactions) {
      setUserReactions(JSON.parse(storedReactions));
    }

    setIsLoading(false);
  }, []);

  // Keep localStorage in sync with state
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("loopListLoops", JSON.stringify(loops));
      localStorage.setItem("loopListCheckIns", JSON.stringify(checkIns));
      localStorage.setItem("loopListReactions", JSON.stringify(userReactions));
    }
  }, [loops, checkIns, userReactions, isLoading]);

  const updatePublicLoops = (allLoops: Loop[]) => {
    const publicOnly = allLoops.filter((loop) => loop.visibility === "public");
    setPublicLoops(publicOnly);
  };

  const createLoop = async (loopData: Partial<Loop>) => {
    if (!user) throw new Error("You must be logged in to create a loop");

    const newLoop: Loop = {
      id: `loop-${Date.now()}`,
      title: loopData.title || "Untitled Loop",
      emoji: loopData.emoji,
      coverImage: loopData.coverImage,
      frequency: loopData.frequency || "daily",
      customDays: loopData.customDays,
      startDate: loopData.startDate || new Date(),
      visibility: loopData.visibility || "private",
      userId: user.id,
      createdAt: new Date(),
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
      status: "active",
      cheers: 0,
      clones: 0,
    };

    setLoops([...loops, newLoop]);
    updatePublicLoops([...loops, newLoop]);

    toast.success("Loop created successfully!");
    return;
  };

  const updateLoop = async (id: string, loopData: Partial<Loop>) => {
    const loopIndex = loops.findIndex((loop) => loop.id === id);

    if (loopIndex === -1) throw new Error("Loop not found");

    const updatedLoop = { ...loops[loopIndex], ...loopData };
    const updatedLoops = [...loops];
    updatedLoops[loopIndex] = updatedLoop;

    setLoops(updatedLoops);
    updatePublicLoops(updatedLoops);

    toast.success("Loop updated successfully!");
    return;
  };

  const deleteLoop = async (id: string) => {
    const filteredLoops = loops.filter((loop) => loop.id !== id);
    setLoops(filteredLoops);
    updatePublicLoops(filteredLoops);

    // Also delete all check-ins for this loop
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.loopId !== id
    );
    setCheckIns(filteredCheckIns);

    toast.success("Loop deleted successfully!");
    return;
  };

  const getLoopById = (id: string) => {
    return [...loops, ...publicLoops].find((loop) => loop.id === id);
  };

  const checkInLoop = async (
    loopId: string,
    date: Date,
    completed: boolean
  ) => {
    if (!user) throw new Error("You must be logged in to check in");

    // Format the date to remove time component for consistent comparison
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    // Check if there's already a check-in for this date
    const existingCheckInIndex = checkIns.findIndex(
      (ci) =>
        ci.loopId === loopId &&
        ci.userId === user.id &&
        new Date(ci.date).toDateString() === formattedDate.toDateString()
    );

    let updatedCheckIns;

    if (existingCheckInIndex >= 0) {
      // Update existing check-in
      updatedCheckIns = [...checkIns];
      updatedCheckIns[existingCheckInIndex] = {
        ...updatedCheckIns[existingCheckInIndex],
        completed,
      };
    } else {
      // Create new check-in
      const newCheckIn: CheckIn = {
        id: `checkin-${loopId}-${formattedDate.toISOString()}`,
        loopId,
        userId: user.id,
        date: formattedDate,
        completed,
      };
      updatedCheckIns = [...checkIns, newCheckIn];
    }

    setCheckIns(updatedCheckIns);

    // Update loop stats (streak, completion rate, etc.)
    const loop = loops.find((l) => l.id === loopId);
    if (loop) {
      const loopCheckIns = updatedCheckIns.filter((ci) => ci.loopId === loopId);
      const completedCheckIns = loopCheckIns.filter((ci) => ci.completed);
      const completionRate =
        loopCheckIns.length > 0
          ? completedCheckIns.length / loopCheckIns.length
          : 0;

      // Calculate current streak
      const sortedCheckIns = loopCheckIns
        .filter((ci) => ci.userId === user.id)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      let currentStreak = 0;
      let breakDetected = false;

      for (const checkIn of sortedCheckIns) {
        if (!checkIn.completed) {
          breakDetected = true;
          break;
        }
        currentStreak++;
      }

      if (breakDetected && !completed) {
        currentStreak = 0;
      } else if (completed) {
        currentStreak++;
      }

      const longestStreak = Math.max(currentStreak, loop.longestStreak || 0);
      const status = currentStreak > 0 ? "active" : "broken";

      await updateLoop(loopId, {
        completionRate,
        currentStreak,
        longestStreak,
        status: status as LoopStatus,
      });
    }

    toast.success(completed ? "Checked in successfully!" : "Check-in updated");
    return;
  };

  const cheerLoop = async (loopId: string) => {
    if (!user) throw new Error("You must be logged in to cheer");

    const loop = [...loops, ...publicLoops].find((l) => l.id === loopId);
    if (!loop) throw new Error("Loop not found");

    // Check if the user has already cheered (liked) this loop
    const existingReaction = userReactions.find(
      (r) => r.loopId === loopId && r.userId === user.id
    );

    if (existingReaction) {
      // User has already cheered, so remove the cheer (unlike)
      const updatedReactions = userReactions.filter(
        (r) => !(r.loopId === loopId && r.userId === user.id)
      );
      setUserReactions(updatedReactions);

      // Decrement the cheer count
      const updatedLoop = {
        ...loop,
        cheers: Math.max(0, (loop.cheers || 0) - 1),
      };

      if (loop.userId === user.id) {
        // Update in the user's loops
        const updatedLoops = loops.map((l) =>
          l.id === loopId ? updatedLoop : l
        );
        setLoops(updatedLoops);
        updatePublicLoops(updatedLoops);
      } else {
        // Update in public loops
        const updatedPublicLoops = publicLoops.map((l) =>
          l.id === loopId ? updatedLoop : l
        );
        setPublicLoops(updatedPublicLoops);
      }

      toast.success("Removed cheer from the loop!");
    } else {
      // User hasn't cheered yet, so add a cheer (like)
      const newReaction: Reaction = {
        id: `reaction-${loopId}-${user.id}-${Date.now()}`,
        loopId,
        userId: user.id,
        type: "cheer",
        createdAt: new Date(),
      };
      setUserReactions([...userReactions, newReaction]);

      // Increment the cheer count
      const updatedLoop = { ...loop, cheers: (loop.cheers || 0) + 1 };

      if (loop.userId === user.id) {
        // Update in the user's loops
        const updatedLoops = loops.map((l) =>
          l.id === loopId ? updatedLoop : l
        );
        setLoops(updatedLoops);
        updatePublicLoops(updatedLoops);
      } else {
        // Update in public loops
        const updatedPublicLoops = publicLoops.map((l) =>
          l.id === loopId ? updatedLoop : l
        );
        setPublicLoops(updatedPublicLoops);
      }

      toast.success("Cheered the loop!");
    }

    return;
  };

  const cloneLoop = async (loopId: string) => {
    if (!user) throw new Error("You must be logged in to clone a loop");

    const originalLoop = [...loops, ...publicLoops].find(
      (l) => l.id === loopId
    );
    if (!originalLoop) throw new Error("Loop not found");

    // Increment the clone count on the original loop
    const updatedOriginalLoop = {
      ...originalLoop,
      clones: (originalLoop.clones || 0) + 1,
    };

    if (originalLoop.userId === user.id) {
      const updatedLoops = loops.map((l) =>
        l.id === loopId ? updatedOriginalLoop : l
      );
      setLoops(updatedLoops);
      updatePublicLoops(updatedLoops);
    } else {
      const updatedPublicLoops = publicLoops.map((l) =>
        l.id === loopId ? updatedOriginalLoop : l
      );
      setPublicLoops(updatedPublicLoops);
    }

    // Create a new cloned loop for the current user
    const clonedLoop: Loop = {
      id: `loop-${Date.now()}`,
      title: `${originalLoop.title} (cloned)`,
      emoji: originalLoop.emoji,
      coverImage: originalLoop.coverImage,
      frequency: originalLoop.frequency,
      customDays: originalLoop.customDays,
      startDate: new Date(),
      visibility: "private",
      userId: user.id,
      createdAt: new Date(),
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
      status: "active",
      cheers: 0,
      clones: 0,
    };

    const updatedLoops = [...loops, clonedLoop];
    setLoops(updatedLoops);
    updatePublicLoops(updatedLoops);

    toast.success("Loop cloned successfully!");
    return;
  };

  const getUserLoops = () => {
    if (!user) return [];
    return loops.filter((loop) => loop.userId === user.id);
  };

  const getTrendingLoops = () => {
    return [...publicLoops]
      .sort((a, b) => b.clones + b.cheers - (a.clones + a.cheers))
      .slice(0, 6);
  };

  const getLoopOfTheDay = () => {
    if (publicLoops.length === 0) return undefined;

    // In a real app, this would be determined by an algorithm or admin
    // For now, just return the one with the highest combined clones and cheers
    const sorted = [...publicLoops].sort(
      (a, b) => b.clones + b.cheers - (a.clones + a.cheers)
    );
    return sorted[0];
  };

  const getCheckInsForLoop = (loopId: string) => {
    return checkIns.filter((checkIn) => checkIn.loopId === loopId);
  };

  const hasUserCheeredLoop = (loopId: string) => {
    return userReactions.some(
      (reaction) => reaction.loopId === loopId && reaction.userId === user.id
    );
  };

  return (
    <LoopContext.Provider
      value={{
        loops,
        publicLoops,
        isLoading,
        createLoop,
        updateLoop,
        deleteLoop,
        getLoopById,
        checkInLoop,
        cheerLoop,
        cloneLoop,
        getUserLoops,
        getTrendingLoops,
        getLoopOfTheDay,
        getCheckInsForLoop,
        hasUserCheeredLoop,
      }}
    >
      {children}
    </LoopContext.Provider>
  );
};

export const useLoops = () => {
  const context = useContext(LoopContext);
  if (context === undefined) {
    throw new Error("useLoops must be used within a LoopProvider");
  }
  return context;
};
