import StudentEnrolledCoursesMain from "@/components/layout/main/dashboards/StudentEnrolledCoursesMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Enrolled Courses | Edurock - Education LMS Template",
  description: "Student Enrolled Courses | Edurock - Education LMS Template",
};
const Student_Enrolled_Courses = () => {
  return (
    <PlainWrapper >
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <StudentEnrolledCoursesMain />
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PlainWrapper>
  );
};

export default Student_Enrolled_Courses;
