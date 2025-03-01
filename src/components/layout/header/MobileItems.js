import React from "react";
import AccordionHome from "./AccordionHome";
import AccordionContainer from "@/components/shared/containers/AccordionContainer";
import MobileMenuItem from "./MobileItem";
import AccordionPages from "./AccordionPages";
import AccordionCourses from "./AccordionCourses";
import AccordionDashboard from "./AccordionDashboard";
import AccordionEcommerce from "./AccordionEcommerce";
import PackagesDropdown from "./PackagesDropdown";
import DropdownDashboard from "./DropdownDashboard";

const MobileMenuItems = () => {
  const items = [
    {
      id: 1,
      name: "Home",
      path: "/",
    
      // dropdown: <DropdownDemoes />,
     
    },
    {
      id: 2,
      name: "About",
      path: "/about",
      accordion: "accordion",
      // dropdown: <DropdownPages />,
     
    },
    {
      id: 3,
      name: "Courses",
      path: "/courses",
      accordion: "accordion",
      // dropdown: <DropdownCourses />,
     
    },
    {
      id: 4,
      name: "Plan",
      path: "/packages",
      accordion: "accordion",
      children: <PackagesDropdown />,
     
    },
    {
      id: 5,
      name: "Dashboards",
      path: "/dashboards/instructor-dashboard",
      accordion: "accordion",
      children: <DropdownDashboard />,
     
    },
    {
      id: 6,
      name: "Contact Us",
      path: "/ecommerce/shop",
      accordion: "accordion",
      // dropdown: <DropdownEcommerce />,
     
    },
  ];

  return (
    <div className="pt-8 pb-6 border-b border-borderColor dark:border-borderColor-dark">
      <AccordionContainer>
        {items.map((item, idx) => (
          <MobileMenuItem key={idx} item={item} />
        ))}
      </AccordionContainer>
    </div>
  );
};

export default MobileMenuItems;
