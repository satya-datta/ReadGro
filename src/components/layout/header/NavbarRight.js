"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DropdownCart from "./DropdownCart";
import Link from "next/link";
import MobileMenuOpen from "@/components/shared/buttons/MobileMenuOpen";
import useIsTrue from "@/hooks/useIsTrue";
import { useUserContext } from "@/contexts/UserContext";

const NavbarRight = () => {
  const isHome4 = useIsTrue("/home-4");
  const isHome4Dark = useIsTrue("/home-4-dark");
  const isHome5 = useIsTrue("/home-5");
  const isHome5Dark = useIsTrue("/home-5-dark");
  const isHome2Dark = useIsTrue("/home-2-dark");
  const { user, isUserAuthenticated } = useUserContext();
  const router = useRouter();

  const handleLoginClick = () => {
    if (!user) {
      router.push("/user/login");
    } else {
      router.push("/user/user-dashboard");
    }
  };

  return (
    <div className="lg:col-start-10 lg:col-span-3">
      <ul className="relative nav-list flex justify-end items-center gap-4">
        {!isHome2Dark && (
          <li className="px-5 lg:px-10px 2xl:px-5 lg:py-4 2xl:py-26px 3xl:py-9 group">
            {/* dropdown menu */}
            <DropdownCart />
          </li>
        )}
        {isHome4 || isHome4Dark || isHome5 || isHome5Dark ? (
          ""
        ) : (
          <li className="hidden lg:block">
            <button
              onClick={handleLoginClick}
              className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor block border-primaryColor border hover:text-primaryColor hover:bg-white px-15px py-2 rounded-standard dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
            >
              Login  <i className="icofont-user-alt-5"></i>
            </button>
          </li>
        )}
        <li className="hidden lg:block">
          <Link
            href="/packages"
            className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor block border-primaryColor border hover:text-primaryColor hover:bg-white px-15px py-2 rounded-standard dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
          >
           Get Started
          </Link>
        </li>
        <li className="block lg:hidden">
          <MobileMenuOpen />
        </li>
      </ul>
    </div>
  );
};

export default NavbarRight;