
export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
};

export type VisibilityType = 'private' | 'public' | 'friends';

export type FrequencyType = 'daily' | 'weekdays' | 'custom' | '3x-weekly';

export type LoopStatus = 'active' | 'broken' | 'completed';

export interface Loop {
  id: string;
  title: string;
  emoji?: string;
  coverImage?: string;
  frequency: FrequencyType;
  customDays?: number[];
  startDate: Date;
  visibility: VisibilityType;
  userId: string;
  createdAt: Date;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  status: LoopStatus;
  cheers: number; // Number of reactions
  clones: number; // Number of people who cloned this loop
}

export interface CheckIn {
  id: string;
  loopId: string;
  userId: string;
  date: Date;
  completed: boolean;
}

export interface Reaction {
  id: string;
  loopId: string;
  userId: string;
  type: string; // emoji or reaction type
  createdAt: Date;
}
