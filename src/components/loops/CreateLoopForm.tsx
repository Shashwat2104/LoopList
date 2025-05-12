import { useState } from "react";
import { useLoops } from "@/context/LoopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FrequencyType, VisibilityType } from "@/types";
import {
  Calendar as CalendarIcon,
  BookOpen,
  Dumbbell,
  Heart,
  Clock,
  Apple,
  Brain,
  Target,
  Leaf,
  Utensils,
  Music,
  Code,
  Pencil,
  Pill,
  Droplet,
  Moon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Habit categories with icons
const HABIT_CATEGORIES = [
  {
    id: "fitness",
    name: "Fitness",
    icon: <Dumbbell className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    icon: <Heart className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "nutrition",
    name: "Nutrition",
    icon: <Apple className="h-5 w-5 text-red-500" />,
  },
  {
    id: "learning",
    name: "Learning",
    icon: <BookOpen className="h-5 w-5 text-amber-500" />,
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: <Target className="h-5 w-5 text-green-500" />,
  },
  {
    id: "coding",
    name: "Coding",
    icon: <Code className="h-5 w-5 text-slate-500" />,
  },
  {
    id: "writing",
    name: "Writing",
    icon: <Pencil className="h-5 w-5 text-pink-500" />,
  },
  {
    id: "health",
    name: "Health",
    icon: <Pill className="h-5 w-5 text-emerald-500" />,
  },
  {
    id: "hydration",
    name: "Hydration",
    icon: <Droplet className="h-5 w-5 text-cyan-500" />,
  },
  {
    id: "sleep",
    name: "Sleep",
    icon: <Moon className="h-5 w-5 text-indigo-500" />,
  },
];

// Emoji groups
const EMOJI_GROUPS = {
  popular: [
    "🔄",
    "📚",
    "💪",
    "🧘",
    "🏃",
    "🍎",
    "🧠",
    "🎯",
    "🌱",
    "💧",
    "💤",
    "🎵",
    "💻",
    "✍️",
    "⏱️",
  ],
  activities: [
    "🏃",
    "🚴",
    "🏋️",
    "🧘",
    "🏊",
    "⚽",
    "🎾",
    "🧗",
    "🤸",
    "🧠",
    "📝",
    "📚",
    "💻",
    "🎨",
    "🎵",
  ],
  health: [
    "💧",
    "🍎",
    "🥦",
    "🥗",
    "💊",
    "😴",
    "🧠",
    "💆",
    "🫁",
    "❤️",
    "🦷",
    "👁️",
    "🧘",
    "🌞",
    "🧹",
  ],
  education: [
    "📚",
    "✏️",
    "🔍",
    "🧮",
    "🗣️",
    "🌎",
    "🔬",
    "🎓",
    "📝",
    "📊",
    "💡",
    "🧩",
    "📖",
    "🎭",
    "🎨",
  ],
};

export default function CreateLoopForm() {
  const { createLoop } = useLoops();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🔄");
  const [frequency, setFrequency] = useState<FrequencyType>("daily");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [visibility, setVisibility] = useState<VisibilityType>("private");
  const [category, setCategory] = useState<string>("");
  const [emojiTab, setEmojiTab] = useState<string>("popular");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLoop({
        title,
        emoji,
        frequency,
        startDate,
        visibility,
        category,
      });

      setOpen(false);
      toast.success("New loop created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create loop");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
    // Set default emoji based on category
    const categoryEmojis: Record<string, string> = {
      fitness: "💪",
      mindfulness: "❤️",
      nutrition: "🍎",
      learning: "📚",
      productivity: "🎯",
      coding: "💻",
      writing: "✍️",
      health: "💊",
      hydration: "💧",
      sleep: "😴",
    };
    if (categoryEmojis[categoryId]) {
      setEmoji(categoryEmojis[categoryId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <span className="text-lg">+</span> New Loop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a New Loop</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label>Habit Category</Label>
            <div className="grid grid-cols-5 gap-2">
              {HABIT_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  variant={category === cat.id ? "default" : "outline"}
                  className={`h-auto flex flex-col gap-1 p-2 ${
                    category === cat.id
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <div className="flex justify-center">{cat.icon}</div>
                  <span className="text-xs font-normal">{cat.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emoji">Icon</Label>
            <Tabs
              value={emojiTab}
              onValueChange={setEmojiTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="m-0">
                <div className="flex flex-wrap gap-2">
                  {EMOJI_GROUPS.popular.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${
                        emoji === e ? "bg-accent" : "hover:bg-secondary"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="activities" className="m-0">
                <div className="flex flex-wrap gap-2">
                  {EMOJI_GROUPS.activities.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${
                        emoji === e ? "bg-accent" : "hover:bg-secondary"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="health" className="m-0">
                <div className="flex flex-wrap gap-2">
                  {EMOJI_GROUPS.health.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${
                        emoji === e ? "bg-accent" : "hover:bg-secondary"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="education" className="m-0">
                <div className="flex flex-wrap gap-2">
                  {EMOJI_GROUPS.education.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${
                        emoji === e ? "bg-accent" : "hover:bg-secondary"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Loop Title</Label>
            <Input
              id="title"
              placeholder="e.g., Read 10 pages, Meditate for 5 minutes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as FrequencyType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekdays">Weekdays only</SelectItem>
                <SelectItem value="3x-weekly">3 times per week</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="visibility" className="flex-grow">
              Make Loop Public
            </Label>
            <Select
              value={visibility}
              onValueChange={(value) => setVisibility(value as VisibilityType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="px-8">
              {isSubmitting ? "Creating..." : "Create Loop"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
