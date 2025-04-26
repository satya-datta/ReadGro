import RGUserTeam from "@/components/layout/main/dashboards/RGUserTeam";

import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

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
            <RGUserTeam />
          </DashboardContainer>
        </UserDashboardWrapper>
      </main>
    </PlainWrapper>
  );
};

export default Student_My_Quiz_Attempts;
