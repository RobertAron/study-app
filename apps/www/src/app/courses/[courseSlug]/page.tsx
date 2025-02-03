import { AppServerPageEntrypoint } from "@/components/AppPage";
import { MotionLink } from "@/components/MotionLink";
import { buttonBehaviorClasses } from "@/components/coreClasses";
import { getPrismaClient } from "@/utils/getPrismaClient";
import { notFound } from "next/navigation";
import { z } from "zod";
import { PracticeCountCell, TimeAttackCell } from "../client";

const paramsTemplate = z.object({ courseSlug: z.string() });
export default AppServerPageEntrypoint(async function TopicCollection({ params }) {
  const { courseSlug } = paramsTemplate.parse(await params);
  const course = await getPrismaClient().course.findUnique({
    where: { slug: courseSlug },
    select: {
      lessons: true,
    },
  });
  if (course === null) notFound();
  return (
    <main className="flex flex-col p-2">
      <h1 className="font-black text-6xl text-blue-700">Lessons</h1>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-3 grid grid-cols-subgrid">
          <div>Lesson</div>
          <div className="text-end">Practice</div>
          <div className="text-end">Speedrun</div>
        </div>
        {course.lessons.map((ele) => (
          <MotionLink
            initial={{ opacity: 0, scaleY: 1.05 }}
            animate={{ opacity: 1, scaleY: 1 }}
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
            className={`col-span-3 grid grid-cols-subgrid ${buttonBehaviorClasses}`}
            href={`/courses/${courseSlug}/${ele.slug}`}
            key={ele.slug}
          >
            <div>{ele.title}</div>
            <PracticeCountCell challengeId={ele.slug} />
            <TimeAttackCell challengeId={ele.slug} />
          </MotionLink>
        ))}
      </div>
    </main>
  );
});
