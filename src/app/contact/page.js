import ContactMain from "@/components/layout/main/ContactMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Contact | ReadGro - Education LMS Template",
  description: "Contact | ReadGro - Education LMS Template",
};

const Contact = async () => {
  return (
    <PageWrapper>
      <main>
        <ContactMain />
      </main>
    </PageWrapper>
  );
};

export default Contact;
