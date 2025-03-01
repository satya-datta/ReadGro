import StudentDashboardMain from "@/components/layout/main/dashboards/StudentDashboardMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Dashboard | Edurock - Education LMS Template",
  description: "Student Dashboard | Edurock - Education LMS Template",
};
const Student_Dashboard = () => {
  return (
    <PlainWrapper>
      <main>
      <UserDashboardWrapper>
          <DashboardContainer>
            <StudentDashboardMain />
          </DashboardContainer>
          </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PlainWrapper>
  );
};

export default Student_Dashboard;
