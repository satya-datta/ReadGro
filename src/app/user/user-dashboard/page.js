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
      {/* Full‐screen light gradient background */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <StudentDashboardMain />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </div>
    </PlainWrapper>
  );
};

export default Student_Dashboard;
