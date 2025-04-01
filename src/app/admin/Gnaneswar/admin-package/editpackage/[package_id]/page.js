"use client";
import AdminEditPackageMain from "@/components/layout/main/dashboards/AdminEditPackageMain";
// import AdminGetPackageMain from "@/components/layout/main/dashboards/AdminGetPackageMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import { useParams } from "next/navigation";
import ThemeController from "@/components/shared/others/ThemeController";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Admin_Package = () => {
  const { package_id } = useParams(); // Extract the course ID from the URL

  return (
    <PageWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminEditPackageMain package_id={package_id} />
          </DashboardContainer>
        </DsahboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Admin_Package;
