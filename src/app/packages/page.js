import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PackageMain from "@/components/layout/main/PackageMain";
export const metadata = {
  title: "Plans | ReadGro - Education LMS Template",
  description: "Plans | ReadGro - Education LMS Template",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <PackageMain />
      </main>
    </PageWrapper>
  );
};

export default Courses;
