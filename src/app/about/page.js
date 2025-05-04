import AboutMain from "@/components/layout/main/AboutMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "About | Edurock - Education LMS Template",
  description: "About | Edurock - Education LMS Template",
};

const About = async () => {
  return (
    <PageWrapper>
      <main>
        <AboutMain />
      </main>
    </PageWrapper>
  );
};

export default About;
