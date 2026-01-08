// Logic Mapping based on Case Study
export const THEMES = {
  CALM: "calm", // Default: Clear, balanced
  VIBRANT: "vibrant", // High energy, playful
  FOCUSED: "focused", // Minimalist, reduced distractions
} as const;

export type ThemeId = (typeof THEMES)[keyof typeof THEMES];

export type MotionLevel = "low" | "high";
export type DensityLevel = "spacious" | "dense";

export type OnboardingOption =
  | {
      label: string;
      value: ThemeId;
      motion?: never;
      density?: never;
    }
  | {
      label: string;
      value?: never;
      motion: MotionLevel;
      density: DensityLevel;
    };

export type OnboardingQuestion = {
  id: number;
  category: string;
  question: string;
  options: OnboardingOption[];
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 1,
    category: "Emotional Tone",
    question: "How do you usually start your day?",
    options: [
      { label: "Quiet time and a slow routine", value: THEMES.CALM },
      { label: "Music, energy, and motion", value: THEMES.VIBRANT },
    ],
  },
  {
    id: 2,
    category: "Visual Energy",
    question: "What makes your trip feel perfect?",
    options: [
      { label: "Everything flows naturally", value: THEMES.CALM },
      { label: "Boom! It leaves you buzzing", value: THEMES.VIBRANT },
    ],
  },
  {
    id: 3,
    category: "Exploration Rhythm",
    question: "When discovering something new, what is your rhythm?",
    options: [
      { label: "Slow down and notice details", motion: "low", density: "spacious" },
      { label: "Jump in and figure it out", motion: "high", density: "dense" },
    ],
  },
];








