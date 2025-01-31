import AdminGetUsers from "@/components/layout/main/dashboards/AdminGetUsers";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import ThemeController from "@/components/shared/others/ThemeController";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Users | Edurock - Education LMS Template",
  description: "Users | Edurock - Education LMS Template",
};
const Admin_Course = () => {
  return (
    <PageWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
          <AdminGetUsers/>  
          </DashboardContainer>
        </DsahboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Admin_Course;
