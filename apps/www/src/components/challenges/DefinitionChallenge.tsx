"use client";
import type { Ref } from "react";
import { ChallengeWrapper } from "./ChallengeWrapper";
import { WordProgress } from "./WordProgress";

type DefinitionChallengeProps = {
  pinyin: string;
  definition: string;
  onComplete?: () => void;
  active?: boolean;
  practice?: boolean;
  ref?: Ref<HTMLDivElement>;
};

export function DefinitionChallenge({
  pinyin,
  onComplete,
  active,
  practice,
  ref,
  definition,
}: DefinitionChallengeProps) {
  return (
    <ChallengeWrapper active={active} ref={ref}>
      <div className="flex min-h-36 items-center justify-center">
        <div className="text-center text-3xl">{definition}</div>
      </div>
      <WordProgress pinyin={pinyin} active={active} practice={practice} onComplete={onComplete} />
    </ChallengeWrapper>
  );
}
