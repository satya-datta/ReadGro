import AdminDashboardMain from "@/components/layout/main/dashboards/AdminDashboardMain";
import RGWithdrawlRequest from "@/components/layout/main/dashboards/RGWithdrawlRequest";
import StudentSettingsMain from "@/components/layout/main/dashboards/StudentSettingsMain";
import WalletTransactions from "@/components/sections/sub-section/dashboards/wallettransactions";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import ThemeController from "@/components/shared/others/ThemeController";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Settings | Edurock - Education LMS Template",
  description: "Student Settings | Edurock - Education LMS Template",
};
const Student_Settings = () => {
  return (
    <PlainWrapper>
      <main>
      <UserDashboardWrapper>
          <DashboardContainer>
            <WalletTransactions />
          </DashboardContainer>
          </UserDashboardWrapper>
        <ThemeController />
      </main>  
    </PlainWrapper>
  );
};

export default Student_Settings;
