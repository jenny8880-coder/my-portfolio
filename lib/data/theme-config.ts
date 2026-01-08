import type { DensityLevel, MotionLevel, ThemeId } from "./onboarding-config";

export type LayoutId = "calm-layout" | "vibrant-layout" | "focused-layout";

export type ThemeConfig = {
  id: ThemeId;
  label: string;
  layout: LayoutId;
  colors: {
    backgroundPrimary: string;
    textPrimary: string;
    accentMain: string;
  };
  motion: MotionLevel;
  density: DensityLevel;
};

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  calm: {
    id: "calm",
    label: "Calm",
    layout: "calm-layout",
    colors: {
      // These map to CSS variables you can tune from Figma later
      backgroundPrimary: "var(--background-primary-calm)",
      textPrimary: "var(--text-primary-calm)",
      accentMain: "var(--accent-main-calm)",
    },
    motion: "low",
    density: "spacious",
  },
  vibrant: {
    id: "vibrant",
    label: "Vibrant",
    layout: "vibrant-layout",
    colors: {
      backgroundPrimary: "var(--background-primary-vibrant)",
      textPrimary: "var(--text-primary-vibrant)",
      accentMain: "var(--accent-main-vibrant)",
    },
    motion: "high",
    density: "dense",
  },
  focused: {
    id: "focused",
    label: "Focused",
    layout: "focused-layout",
    colors: {
      backgroundPrimary: "var(--background-primary-focused)",
      textPrimary: "var(--text-primary-focused)",
      accentMain: "var(--accent-main-focused)",
    },
    motion: "low",
    density: "dense",
  },
};








