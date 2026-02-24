import type { LucideIcon } from "lucide-react";

export interface DifficultyBreakdown {
  label: string;
  count: number;
  accent: string;
  barColor: string;
}

export interface StatCardData {
  id: string;
  icon: LucideIcon;
  value: number;
  label: string;
  subLabel?: string;
  badgeImage?: string;
  secondaryValue?: number;
  secondaryLabel?: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  prominent?: boolean;
  breakdown?: DifficultyBreakdown[];
  profileUrl?: string;
}
