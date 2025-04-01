import AdminPayments from "@/components/layout/main/dashboards/AdminPayments";
// import AdminQuizAttemptsMain from "@/components/layout/main/dashboards/AdminQuizAttemptsMain";
// import ManageUsers from "@/components/layout/main/dashboards/ManageUsers";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import ThemeController from "@/components/shared/others/ThemeController";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Admin Quiz Attempts | Edurock - Education LMS Template",
  description: "Admin Quiz Attempts | Edurock - Education LMS Template",
};
const Admin_Quiz_Attempts = () => {
  return (
    <PageWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminPayments />
          </DashboardContainer>
        </DsahboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Admin_Quiz_Attempts;
