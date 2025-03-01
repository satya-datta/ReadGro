import StudentEnrolledCoursesMain from "@/components/layout/main/dashboards/StudentEnrolledCoursesMain";
import StudentMyQuizAttemptsMain from "@/components/layout/main/dashboards/StudentMyQuizAttemptsMain";
import UserPackagePlan from "@/components/layout/main/dashboards/UserPackagesPlan";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student My Quiz Attempts | Edurock - Education LMS Template",
  description: "Student My Quiz Attempts | Edurock - Education LMS Template",
};
const Student_My_Quiz_Attempts = () => {
  return (
    <PlainWrapper>
      <main>
      <UserDashboardWrapper>
          <DashboardContainer>
            <UserPackagePlan/>
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PlainWrapper>
  );
};

export default Student_My_Quiz_Attempts;
