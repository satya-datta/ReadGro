import StudentProfileMain from "@/components/layout/main/dashboards/StudentProfileMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import UserKYC from "@/components/layout/main/dashboards/UserKYC";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Student Message | Edurock - Education LMS Template",
  description: "Student Message | Edurock - Education LMS Template",
};
const Student_Message = () => {
  return (
    <PlainWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
          <UserKYC />   
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PlainWrapper>
  );
};

export default Student_Message;
