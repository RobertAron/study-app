import { getDrizzleClient } from "@/utils/getDrizzleClient";
import { notFound } from "next/navigation";
import React from "react";
import type { ParamsShape } from "./paramsTemplate";
import { wordToAudioSource } from "@/utils/idToAudioSource";

function deDupe<T, U>(arr: T[], cb: (ele: T) => U) {
  const soFar = new Set<U>();
  return arr.filter((ele) => {
    const key = cb(ele);
    if (soFar.has(key)) return false;
    soFar.add(key);
    return true;
  });
}

async function getAllWordsInLesson(lessonSlug: string) {
  const lesson = await getDrizzleClient().query.lesson.findFirst({
    where: (lessonTable, { eq }) => eq(lessonTable.slug, lessonSlug),
    columns: {
      title: true,
    },
    with: {
      course: {
        columns: {
          title: true,
        },
      },
      drills: {
        with: {
          drillToWords: {
            with: {
              word: true,
            },
          },
        },
      },
    },
  });
  if (lesson == null) notFound();
  return {
    courseTitle: lesson.course.title,
    lessonTitle: lesson.title,
    drillTitle: "Final Mastery",
    words: deDupe(
      lesson.drills.flatMap((drill) => drill.drillToWords.map((ele) => ele.word)),
      (ele) => ele.id,
    ),
  };
}
async function getAllWordsInDrill(drillSlug: string) {
  const drill = await getDrizzleClient().query.drill.findFirst({
    where: (t, { eq }) => eq(t.slug, drillSlug),
    columns: {
      title: true,
    },
    with: {
      drillToWords: {
        with: {
          word: true,
        },
      },
      lesson: {
        columns: {
          title: true,
        },
        with: {
          course: {
            columns: {
              title: true,
            },
          },
        },
      },
    },
  });
  if (drill == null) notFound();
  return {
    courseTitle: drill.lesson.course.title,
    lessonTitle: drill.lesson.title,
    drillTitle: drill.title,
    words: deDupe(
      drill.drillToWords.flatMap((ele) => ele.word),
      (ele) => ele.id,
    ),
  };
}

export const getDrillInfo = React.cache(async function c(params: ParamsShape) {
  const data = await (params.drillSlug.startsWith("final-mastery")
    ? getAllWordsInLesson(params.lessonSlug)
    : getAllWordsInDrill(params.drillSlug));
  return {
    ...data,
    words: data.words.map((ele) => ({
      ...ele,
      audioSrc: wordToAudioSource(ele.id),
    })),
  };
});
