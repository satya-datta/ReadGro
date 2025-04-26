import RGWithdrawlRequest from "@/components/layout/main/dashboards/RGWithdrawlRequest";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Instructor Announcements | Edurock - Education LMS Template",
  description: "Instructor Announcements | Edurock - Education LMS Template",
};
const Instructor_Announcements = () => {
  return (
    <PlainWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <RGWithdrawlRequest />
          </DashboardContainer>
        </UserDashboardWrapper>
      </main>
    </PlainWrapper>
  );
};

export default Instructor_Announcements;
