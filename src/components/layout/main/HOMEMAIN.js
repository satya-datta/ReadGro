import Faq from "@/components/sections/faq/Faq";
import Counter2 from "@/components/sections/sub-section/Counter2";
import React, { Suspense } from "react";

// Lazy load components
const Hero7 = React.lazy(() =>
  import("@/components/sections/hero-banners/Hero7")
);
const About11 = React.lazy(() =>
  import("@/components/sections/abouts/About11")
);

const CoursesFilter = React.lazy(() =>
  import("@/components/sections/courses/CoursesFilter")
);

const PricingPlans = React.lazy(() =>
  import("@/components/sections/pricing-plans/PricingPlans")
);

const Testimonials = React.lazy(() =>
  import("@/components/sections/testimonials/Testimonials")
);

const HOMEMAIN = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Hero Section...</div>}>
        <div style={{ marginBottom: "90px" }}>
          <Hero7 />
        </div>
      </Suspense>

      <Suspense fallback={<div>Loading About Section...</div>}>
        <About11 />
      </Suspense>

      <Suspense fallback={<div>Loading Counter2...</div>}>
        <Counter2 type="lg" />
      </Suspense>

      <Suspense fallback={<div>Loading Courses...</div>}>
        <CoursesFilter />
      </Suspense>

      <Suspense fallback={<div>Loading Pricing Plans...</div>}>
        <PricingPlans />
      </Suspense>
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div>Loading Counter2...</div>}>
        <Faq />
      </Suspense>
    </>
  );
};

export default HOMEMAIN;
