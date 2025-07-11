"use client";
import type React from "react";
import { ezCreateContext } from "@/utils/createContext";
import type { DrillInfo, PhraseDefinition, WordDefinition } from "./challengeServerUtils";

interface ProviderProps extends DrillInfo {
  children?: React.ReactNode;
  courseSlug: string;
  lessonSlug: string;
  drillSlug: string;
}

type ProvidedValue = {
  challengeId: string;
  challengeLabel: string;
  description: string | null;
  wordDefinitions: WordDefinition[];
  phraseDefinitions: PhraseDefinition[];
  lessonSlug: string;
  courseSlug: string;
};

export const { Provider: DrillProvider, useContext: useDrillContext } = ezCreateContext<
  ProvidedValue,
  ProviderProps
>(
  (Provider) =>
    function DrillProvider({
      children,
      drillTitle,
      words,
      courseSlug,
      lessonSlug,
      drillSlug,
      phrases,
      description,
    }: ProviderProps) {
      return (
        <Provider
          value={{
            challengeId: drillSlug,
            challengeLabel: drillTitle,
            wordDefinitions: words,
            phraseDefinitions: phrases,
            description,
            courseSlug,
            lessonSlug,
          }}
        >
          {children}
        </Provider>
      );
    },
);
