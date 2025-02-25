"use client";
import { useUserSettings } from "@/components/useUserSettings";
import { generateContext } from "@/utils/createContext";
import type React from "react";
import type { DrillInfo } from "./challengeServerUtils";

export type WordDefinition = {
  id: number;
  characters: string;
  pinyin: string;
  meaning: string;
  audioSrc: string;
  emojiChallenge: string | null;
};

export type ChallengeDefinition = {
  label: string;
  words: WordDefinition[];
  phrases: WordDefinition[];
};

type ProviderProps = {
  children?: React.ReactNode;
  courseSlug: string;
  lessonSlug: string;
  drillSlug: string;
} & DrillInfo;
type CharacterChallenge = {
  type: "character-challenge";
  id: string;
  character: string;
  pinyin: string;
};
type AudioChallenge = {
  type: "audio-challenge";
  id: string;
  pinyin: string;
  src: string;
};
type DefinitionChallenge = {
  type: "definition-challenge";
  id: string;
  pinyin: string;
  definition: string;
};
export type AllChallenges = CharacterChallenge | AudioChallenge | DefinitionChallenge;
type ProvidedValue = {
  challengeId: string;
  challengeLabel: string;
  description: string | null;
  wordDefinitions: WordDefinition[];
  phraseDefinitions: WordDefinition[];
  challenges: AllChallenges[];
  lessonSlug: string;
  courseSlug: string;
};

function wordDefinitionToChallenges(
  userSettings: ReturnType<typeof useUserSettings>[0],
  words: WordDefinition[],
) {
  return words.flatMap(({ characters, meaning, id, pinyin, audioSrc, emojiChallenge }): AllChallenges[] => {
    const result: AllChallenges[] = [
      { type: "audio-challenge", id: `${id}-audio`, pinyin, src: audioSrc },
      {
        type: "definition-challenge",
        definition: meaning,
        id: `${id}-definition`,
        pinyin,
      },
    ];
    if (emojiChallenge != null)
      result.push({
        type: "character-challenge",
        id: `${id}-emoji`,
        pinyin,
        character: emojiChallenge,
      });
    if (userSettings.enableCharacterChallenges)
      result.push({
        type: "character-challenge",
        id: `${id}-pinyin`,
        pinyin,
        character: characters,
      });
    return result;
  });
}

export const { Provider: DrillProvider, useContext: useDrillContext } = generateContext<
  ProviderProps,
  ProvidedValue
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
      const [userSettings] = useUserSettings();
      const wordChallenges = wordDefinitionToChallenges(userSettings, words);
      const phraseChallenges = wordDefinitionToChallenges(userSettings, phrases);
      return (
        <Provider
          value={{
            challengeId: drillSlug,
            challengeLabel: drillTitle,
            wordDefinitions: words,
            phraseDefinitions: phrases,
            description,
            challenges: [...wordChallenges, ...phraseChallenges],
            courseSlug,
            lessonSlug,
          }}
        >
          {children}
        </Provider>
      );
    },
);
