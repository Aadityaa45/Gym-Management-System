import {
  Dumbbell,
  Crown,
  Gem,
  Flame,
  Shield,
  Trophy,
} from "lucide-react";

const colors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

const icons = [
  Dumbbell,
  Crown,
  Gem,
  Flame,
  Shield,
  Trophy,
];

export const getPlanTheme = (index) => ({
  accentColor: colors[index % colors.length],
  icon: icons[index % icons.length],
});