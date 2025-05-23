import ErrorMain from "@/components/layout/main/ErrorMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
export const metadata = {
  title: "Error - Dark | ReadGro - Education LMS Template",
  description: "Error - Dark | ReadGro - Education LMS Template",
};
const Error_Dark = () => {
  return (
    <PageWrapper>
      <main className="is-dark">
        <ErrorMain />
      </main>
    </PageWrapper>
  );
};

export default Error_Dark;
