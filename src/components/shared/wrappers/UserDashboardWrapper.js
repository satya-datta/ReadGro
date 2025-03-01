"use client";
import UserHeroDashboard from "@/components/sections/hero-banners/UserHeroDashboard";

const UserDashboardWrapper = ({ children }) => {
  return (
    <>
      <UserHeroDashboard />
      {children}
    </>
  );
};

export default UserDashboardWrapper;
