import {
  Dumbbell,
  Star,
  User,
} from "lucide-react";

export const plans = [
  {
    title: "Basic Plan",
    price: 1499,
    duration: "month",
    icon: Dumbbell,
    accentColor: "#8B5CF6",
    members: 120,
    features: [
      "Gym Access",
      "Basic Equipment",
      "Locker Room Access",
    ],
  },

  {
    title: "Standard Plan",
    price: 2499,
    duration: "month",
    icon: Dumbbell,
    accentColor: "#3B82F6",
    members: 230,
    features: [
      "Gym Access",
      "All Equipment",
      "Locker Room Access",
      "1 Free Group Class",
      "Priority Support",
    ],
  },

  {
    title: "Premium Plan",
    price: 3999,
    duration: "month",
    icon: Star,
    accentColor: "#FACC15",
    members: 210,
    features: [
      "Gym Access",
      "All Equipment",
      "Locker Room Access",
      "Unlimited Group Classes",
      "1 Free Personal Training",
      "Nutrition Plan",
      "Priority Support",
    ],
  },

  {
    title: "Personal Training",
    price: 5999,
    duration: "month",
    icon: User,
    accentColor: "#22C55E",
    members: 110,
    features: [
      "Personal Training",
      "Custom Workout Plan",
      "Diet Consultation",
      "1:1 Sessions",
      "Body Composition Assessment",
      "Priority Support",
    ],
  },
];