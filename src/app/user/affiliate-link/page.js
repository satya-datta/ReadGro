import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import UserAffiliateForm from "@/components/shared/dashboards/UserAffiliateForm";
import ThemeController from "@/components/shared/others/ThemeController";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Reviews | Edurock - Education LMS Template",
  description: "Student Reviews | Edurock - Education LMS Template",
};
const Student_Reviews = () => {
  return (
    <PlainWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <UserAffiliateForm />
          </DashboardContainer>
        </UserDashboardWrapper>
      </main>
    </PlainWrapper>
  );
};

export default Student_Reviews;
