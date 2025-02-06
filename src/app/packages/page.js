import CoursesMain from "@/components/layout/main/CoursesMain";

import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PackageMain from "@/components/layout/main/PackageMain"
export const metadata = {
  title: "Courses | Edurock - Education LMS Template",
  description: "Courses | Edurock - Education LMS Template",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <PackageMain />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Courses;
