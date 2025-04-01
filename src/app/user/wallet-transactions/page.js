
import WalletTransactions from "@/components/sections/sub-section/dashboards/wallettransactions";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Settings | Edurock - Education LMS Template",
  description: "Student Settings | Edurock - Education LMS Template",
};
const Student_Settings = () => {
  return (
    <PageWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <WalletTransactions />
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Student_Settings;
