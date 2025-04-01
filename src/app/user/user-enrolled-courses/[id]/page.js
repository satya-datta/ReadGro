import CourseDetailsMainUser from "@/components/layout/main/CourseDeailsMainUser";

import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Enrolled Courses | Edurock - Education LMS Template",
  description: "Student Enrolled Courses | Edurock - Education LMS Template",
};
const Student_Enrolled_Courses = ({ params }) => {
  const { id } = params;
  return (
    <PageWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <CourseDetailsMainUser id={id} />
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Student_Enrolled_Courses;
