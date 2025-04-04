"use client";
import { MotionLink } from "@/components/MotionLink";
import { useDrillContext } from "@/components/challenges/ChallengeContext";
import { WordOutline } from "@/components/challenges/WordOutline";
import { WordExperience } from "@/components/challenges/WordPoints";
import { buttonBehaviorClasses } from "@/components/coreClasses";
import {
  formatPracticeCount,
  formatTimeAttackMs,
  usePracticeCount,
  useTimeAttackPB,
} from "@/utils/playerState";
import { deDupe } from "@/utils/structureUtils";
import { ListChecks, Timer } from "lucide-react";
import * as motion from "motion/react-client";
import { useMemo } from "react";

function ModeOption({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <MotionLink
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ rotate: 1, scale: 1.1 }}
      whileFocus={{ rotate: 1, scale: 1.1 }}
      transition={{
        duration: 0.1,
      }}
      href={href}
      className={`group flex shrink flex-grow basis-0 items-center gap-4 p-3 hover:z-10 ${buttonBehaviorClasses}`}
    >
      {children}
    </MotionLink>
  );
}

export function DrillHome() {
  const { challengeId, wordDefinitions, phraseDefinitions, courseSlug, lessonSlug, description } =
    useDrillContext();
  const [timeAttackPb] = useTimeAttackPB(challengeId);
  const [practiceCount] = usePracticeCount(challengeId);
  const allWords = useMemo(() => {
    const wordsRaw = wordDefinitions.map(({ id, pinyin, characters }) => ({
      id,
      pinyin,
      characters,
    }));
    const wordsUsed = phraseDefinitions.flatMap(({ words }) => words);
    return deDupe([...wordsRaw, ...wordsUsed], ({ id }) => id);
  }, [wordDefinitions, phraseDefinitions]);
  return (
    <>
      <section className="flex w-full flex-col gap-2">
        <h2 className="font-bold text-4xl text-blue-700">Select Mode</h2>
        <div className="flex flex-wrap gap-4">
          <ModeOption href={`/courses/${courseSlug}/${lessonSlug}/${challengeId}/practice`}>
            <div className="h-32 w-32 flex-shrink-0 rounded-full bg-black p-4 text-white group-hocus:bg-white group-hocus:text-black">
              <ListChecks className="h-full w-full" />
            </div>
            <div>
              <div className="text-6xl">Practice</div>
              <div className="text-4xl">{formatPracticeCount(practiceCount)}</div>
            </div>
          </ModeOption>
          <ModeOption href={`/courses/${courseSlug}/${lessonSlug}/${challengeId}/time-attack`}>
            <div className="h-32 w-32 flex-shrink-0 rounded-full bg-black p-4 text-white group-hocus:bg-white group-hocus:text-black">
              <Timer className="h-full w-full" />
            </div>
            <div>
              <div className="truncate whitespace-nowrap text-6xl">Time Attack</div>
              <div className="truncate whitespace-nowrap text-4xl">{formatTimeAttackMs(timeAttackPb)}</div>
            </div>
          </ModeOption>
        </div>
      </section>
      {description !== null && (
        <section className="border-2 border-black bg-white">
          <div className="border-blue-700 border-l-8 p-2">
            <h2 className="text-3xl">Description</h2>
            <p>{description}</p>
          </div>
        </section>
      )}
      {wordDefinitions.length > 0 && (
        <section className="flex w-full flex-col gap-2">
          <h2 className="font-semibold text-2xl">Practice Words</h2>
          <ul className="grid w-full grid-cols-2 gap-4 xl:grid-cols-3">
            {wordDefinitions.map((word, index) => (
              <motion.li
                key={word.id}
                initial={{
                  y: 50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.02 * index,
                  },
                }}
              >
                <WordOutline word={word} />
              </motion.li>
            ))}
          </ul>
        </section>
      )}
      {phraseDefinitions.length > 0 && (
        <section className="flex w-full flex-col gap-2">
          <h2 className="font-semibold text-2xl">Practice Phrases</h2>
          <ul className="grid w-full gap-4">
            {phraseDefinitions.map((phrase, index) => (
              <motion.li
                key={phrase.id}
                initial={{
                  y: 50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.02 * index,
                  },
                }}
              >
                <WordOutline word={phrase} />
              </motion.li>
            ))}
          </ul>
        </section>
      )}
      <section className="flex w-full flex-col gap-2">
        <h2 className="font-semibold text-2xl">All Words</h2>
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {allWords.map((ele) => (
            <li key={ele.id}>
              <WordExperience {...ele} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
