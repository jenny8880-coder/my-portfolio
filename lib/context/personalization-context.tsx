"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ONBOARDING_QUESTIONS,
  type DensityLevel,
  type MotionLevel,
  type OnboardingOption,
  type ThemeId,
} from "../data/onboarding-config";

// Re-export ThemeId for use in other components
export type { ThemeId };
import { THEME_CONFIGS } from "../data/theme-config";

export type AnswerMap = Record<number, OnboardingOption | undefined>;

export type PersonalizationState = {
  theme: ThemeId;
  motion: MotionLevel;
  density: DensityLevel;
  answers: AnswerMap;
  hasCompletedOnboarding: boolean;
};

export type PersonalizationContextValue = PersonalizationState & {
  answerQuestion: (questionId: number, option: OnboardingOption) => void;
  resetOnboarding: () => void;
  finalizeFromAnswers: () => void;
  switchTheme: (newTheme: ThemeId) => void;
  completeOnboarding: () => void;
};

const DEFAULT_THEME: ThemeId = "calm";

const PersonalizationContext = createContext<PersonalizationContextValue | undefined>(
  undefined,
);

function derivePreferencesFromAnswers(answers: AnswerMap): {
  theme: ThemeId;
  motion: MotionLevel;
  density: DensityLevel;
} {
  // Simple heuristic: majority choice between calm/vibrant; fallback to calm.
  let calmVotes = 0;
  let vibrantVotes = 0;

  Object.values(answers).forEach((answer) => {
    if (!answer || !("value" in answer) || !answer.value) return;
    if (answer.value === "calm") calmVotes += 1;
    if (answer.value === "vibrant") vibrantVotes += 1;
  });

  const theme: ThemeId =
    vibrantVotes > calmVotes ? "vibrant" : (DEFAULT_THEME as ThemeId);

  // Motion & density are driven by question 3 in this case study.
  const rhythmQuestion = ONBOARDING_QUESTIONS.find((q) => q.id === 3);
  const rhythmAnswer = rhythmQuestion ? answers[rhythmQuestion.id] : undefined;

  const motion: MotionLevel =
    (rhythmAnswer && "motion" in rhythmAnswer ? rhythmAnswer.motion : "low") as MotionLevel;
  const density: DensityLevel =
    (rhythmAnswer && "density" in rhythmAnswer ? rhythmAnswer.density : "spacious") as DensityLevel;

  return { theme, motion, density };
}

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [{ theme, motion, density, hasCompletedOnboarding }, setState] =
    useState<Omit<PersonalizationState, "answers">>({
      theme: DEFAULT_THEME,
      motion: "low",
      density: "spacious",
      hasCompletedOnboarding: false,
    });

  // Set initial theme attributes on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const themeConfig = THEME_CONFIGS[theme];
      const root = document.documentElement;
      root.setAttribute("data-theme", theme);
      root.setAttribute("data-density", density);
      root.setAttribute("data-motion", motion);
      root.style.setProperty(
        "--background-primary",
        themeConfig.colors.backgroundPrimary,
      );
      root.style.setProperty("--text-primary", themeConfig.colors.textPrimary);
      root.style.setProperty("--accent-main", themeConfig.colors.accentMain);
    }
  }, [theme, motion, density]);

  const value = useMemo<PersonalizationContextValue>(() => {
    const answerQuestion = (questionId: number, option: OnboardingOption) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: option,
      }));
    };

    const resetOnboarding = () => {
      setAnswers({});
      setState({
        theme: DEFAULT_THEME,
        motion: "low",
        density: "spacious",
        hasCompletedOnboarding: false,
      });
      if (typeof document !== "undefined") {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.removeAttribute("data-density");
        document.documentElement.removeAttribute("data-motion");
      }
    };

    const finalizeFromAnswers = () => {
      const derived = derivePreferencesFromAnswers(answers);
      const themeConfig = THEME_CONFIGS[derived.theme];

      setState({
        theme: derived.theme,
        motion: derived.motion,
        density: derived.density,
        hasCompletedOnboarding: true,
      });

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.setAttribute("data-theme", derived.theme);
        root.setAttribute("data-density", derived.density);
        root.setAttribute("data-motion", derived.motion);

        root.style.setProperty(
          "--background-primary",
          themeConfig.colors.backgroundPrimary,
        );
        root.style.setProperty("--text-primary", themeConfig.colors.textPrimary);
        root.style.setProperty("--accent-main", themeConfig.colors.accentMain);
      }
    };

    const switchTheme = (newTheme: ThemeId) => {
      const themeConfig = THEME_CONFIGS[newTheme];
      
      setState((prev) => ({
        ...prev,
        theme: newTheme,
      }));

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.setAttribute("data-theme", newTheme);
        
        root.style.setProperty(
          "--background-primary",
          themeConfig.colors.backgroundPrimary,
        );
        root.style.setProperty("--text-primary", themeConfig.colors.textPrimary);
        root.style.setProperty("--accent-main", themeConfig.colors.accentMain);
      }
    };

    const completeOnboarding = () => {
      setState((prev) => ({
        ...prev,
        hasCompletedOnboarding: true,
      }));
    };

    return {
      theme,
      motion,
      density,
      answers,
      hasCompletedOnboarding,
      answerQuestion,
      resetOnboarding,
      finalizeFromAnswers,
      switchTheme,
      completeOnboarding,
    };
  }, [answers, theme, motion, density, hasCompletedOnboarding]);

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const ctx = useContext(PersonalizationContext);
  if (!ctx) {
    throw new Error("usePersonalization must be used within PersonalizationProvider");
  }
  return ctx;
}



