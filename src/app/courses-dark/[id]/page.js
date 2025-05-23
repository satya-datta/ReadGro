import CourseDetailsMain from "@/components/layout/main/CourseDetailsMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import courses from "@/../public/fakedata/courses.json";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Courses Details - Dark | ReadGro - Education LMS Template",
  description: "Courses Details - Dark | ReadGro - Education LMS Template",
};
const Course_Details_Dark = ({ params }) => {
  const { id } = params;
  const isExistCourse = courses?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistCourse) {
    notFound();
  }
  return (
    <PageWrapper>
      <main className="is-dark">
        <CourseDetailsMain />
      </main>
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return courses?.map(({ id }) => ({ id: id.toString() }));
}
export default Course_Details_Dark;
