import LoginMain from "@/components/layout/main/LoginMain";
import ThemeController from "@/components/shared/others/ThemeController";

import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Login/Register | Edurock - Education LMS Template",
  description: "Login/Register | Edurock - Education LMS Template",
};
const Login = () => {
  return (
    <PlainWrapper>
      <main>
        <LoginMain />
      </main>
    </PlainWrapper>
  );
};

export default Login;
