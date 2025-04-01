import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import UserAffiliateForm from "@/components/shared/dashboards/UserAffiliateForm";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Reviews | Edurock - Education LMS Template",
  description: "Student Reviews | Edurock - Education LMS Template",
};
const Student_Reviews = () => {
  return (
    <PageWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <UserAffiliateForm />
          </DashboardContainer>
        </UserDashboardWrapper>
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Student_Reviews;
