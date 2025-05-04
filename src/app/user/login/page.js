import LoginMain from "@/components/layout/main/LoginMain";
import UserLoginMain from "@/components/layout/main/UserLoginMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Login/Register | ReadGro - Education LMS Template",
  description: "Login/Register | ReadGro - Education LMS Template",
};
const Login = () => {
  return (
    <PlainWrapper>
      <main>
        <UserLoginMain />
      </main>
    </PlainWrapper>
  );
};

export default Login;
