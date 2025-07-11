import { AppServerLayoutEntrypoint } from "@/components/AppPage";
import { getCourseOutline } from "./getCourseOutline";
import { paramsTemplate } from "./paramsTemplate";
import { CourseTitleLink, DrillLink, LessonLink } from "./SideNavLink";

export default AppServerLayoutEntrypoint(async ({ children, params }) => {
  const { courseSlug } = paramsTemplate.parse(await params);
  const course = await getCourseOutline(courseSlug);
  return (
    <div className="flex grow items-stretch">
      <div className="hidden w-64 shrink-0 flex-col gap-2 border-black border-r lg:flex">
        <CourseTitleLink courseSlug={course.slug}>{course.title}</CourseTitleLink>
        {course.lessons.map((lesson) => (
          <div className="flex flex-col" key={lesson.title}>
            <LessonLink courseSlug={courseSlug} lessonSlug={lesson.slug} title={lesson.title} />
            <ol className="flex flex-col">
              {lesson.drills.map((drill) => (
                <li key={drill.slug}>
                  <DrillLink
                    courseSlug={courseSlug}
                    lessonSlug={lesson.slug}
                    drillSlug={drill.slug}
                    title={drill.title}
                  />
                </li>
              ))}
              <li>
                <DrillLink
                  courseSlug={courseSlug}
                  lessonSlug={lesson.slug}
                  drillSlug={`final-mastery-${lesson.slug}`}
                  title="Final Mastery"
                />
              </li>
            </ol>
          </div>
        ))}
      </div>
      <div className="flex grow flex-col px-3 pt-1 pb-3">{children}</div>
    </div>
  );
});
