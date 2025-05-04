import LoginMain from "@/components/layout/main/LoginMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Login/Register | ReadGro - Education LMS Template",
  description: "Login/Register | ReadGro - Education LMS Template",
};
const Login = () => {
  return (
    <PageWrapper>
      <main>
        <LoginMain />
      </main>
    </PageWrapper>
  );
};

export default Login;
