import CourseDetailsUser from "@/components/sections/course-details/CourseDetailsUser";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CourseDetailsMainUser = ({ id }) => {
  return (
    <div className="p-10px md:px-10 md:py-50px  bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
    
      <CourseDetailsUser id={id} />
    </div>
  );
};

export default CourseDetailsMainUser;
