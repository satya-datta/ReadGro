import React from "react";
import Navitem from "./Navitem";
import DropdownDemoes from "./DropdownDemoes";
import DropdownPages from "./DropdownPages";
import DropdownCourses from "./DropdownCourses";
import DropdownWrapper from "@/components/shared/wrappers/DropdownWrapper";
import DropdownDashboard from "./DropdownDashboard";
import DropdownEcommerce from "./DropdownEcommerce";
import PackagesDropdown from "./PackagesDropdown";

const NavItems = () => {
  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      // dropdown: <DropdownDemoes />,
      isRelative: false,
    },
    {
      id: 2,
      name: "About",
      path: "/about",
      // dropdown: <DropdownPages />,
      isRelative: false,
    },
    {
      id: 3,
      name: "Courses",
      path: "/courses",
      // dropdown: <DropdownCourses />,
      isRelative: false,
    },
    {
      id: 4,
      name: "Plan",
      path: "/packages",
      dropdown: <PackagesDropdown />,
      isRelative: true,
    },
    {
      id: 5,
      name: "Dashboards",
      path: "/dashboards/instructor-dashboard",
      dropdown: <DropdownDashboard />,
      isRelative: true,
    },
    {
      id: 6,
      name: "Contact Us",
      path: "/ecommerce/shop",
      // dropdown: <DropdownEcommerce />,
      isRelative: true,
    },
  ];
  return (
    <div className="hidden lg:block lg:col-start-3 lg:col-span-7">
      <ul className="nav-list flex justify-center">
        {navItems.map((navItem, idx) => (
          <Navitem key={idx} idx={idx} navItem={{ ...navItem, idx: idx }}>
            <DropdownWrapper>{navItem.dropdown}</DropdownWrapper>
          </Navitem>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
