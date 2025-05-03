// import AdminAddCourseMain from "@/components/layout/main/dashboards/AdminAddCourseMain";
import AdminAddPackageMain from "@/components/layout/main/dashboards/AdminAddPackageMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import ThemeController from "@/components/shared/others/ThemeController";
import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Admin Course | Edurock - Education LMS Template",
  description: "Admin Course | Edurock - Education LMS Template",
};
const Admin_Course = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminAddPackageMain />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
