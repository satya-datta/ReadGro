import CoursesMain from "@/components/layout/main/CoursesMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Courses | Edurock - Education LMS Template",
  description: "Courses | Edurock - Education LMS Template",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <CoursesMain />
      </main>
    </PageWrapper>
  );
};

export default Courses;
