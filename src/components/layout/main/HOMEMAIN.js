import React, { Suspense } from "react";

// Lazy load components
const Hero7 = React.lazy(() =>
  import("@/components/sections/hero-banners/Hero7")
);
const About1 = React.lazy(() => import("@/components/sections/abouts/About1"));
// const PopularSubjects = React.lazy(() =>
//   import("@/components/sections/popular-subjects/PopularSubjects")
// );
const CoursesFilter = React.lazy(() =>
  import("@/components/sections/courses/CoursesFilter")
);
const Registration = React.lazy(() =>
  import("@/components/sections/registrations/Registration")
);
const PricingPlans = React.lazy(() =>
  import("@/components/sections/pricing-plans/PricingPlans")
);
const Instructors = React.lazy(() =>
  import("@/components/sections/instructors/Instructors")
);
const Testimonials = React.lazy(() =>
  import("@/components/sections/testimonials/Testimonials")
);
const Blogs = React.lazy(() => import("@/components/sections/blogs/Blogs"));

const HOMEMAIN = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Hero Section...</div>}>
        <div style={{ marginBottom: "90px" }}>
          <Hero7 />
        </div>
      </Suspense>

      <Suspense fallback={<div>Loading About Section...</div>}>
        <About1 />
      </Suspense>
      {/* 
      <Suspense fallback={<div>Loading Popular Subjects...</div>}>
        <PopularSubjects />
      </Suspense> */}

      <Suspense fallback={<div>Loading Courses...</div>}>
        <CoursesFilter />
      </Suspense>

      <Suspense fallback={<div>Loading Registration Section...</div>}>
        <Registration />
      </Suspense>

      <Suspense fallback={<div>Loading Pricing Plans...</div>}>
        <PricingPlans />
      </Suspense>
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>

      {/* <Suspense fallback={<div>Loading Instructors...</div>}>
        <Instructors />
      </Suspense>

      <Suspense fallback={<div>Loading Blogs...</div>}>
        <Blogs />
      </Suspense> */}
    </>
  );
};

export default HOMEMAIN;
