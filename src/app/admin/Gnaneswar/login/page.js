import LoginMain from "@/components/layout/main/LoginMain";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";

import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Login/Register | ReadGro - Education LMS Template",
  description: "Login/Register | ReadGro - Education LMS Template",
};
const Login = () => {
  return (
    <AdminWrapper>
      <main>
        <LoginMain />
      </main>
    </AdminWrapper>
  );
};

export default Login;
