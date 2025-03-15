import Home1 from "@/components/layout/main/Home1";
import Home7 from "@/components/layout/main/Home7";
import HOMEMAIN from "@/components/layout/main/HOMEMAIN";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main>
        <HOMEMAIN />
        <ThemeController />
      </main>
    </PageWrapper>
  );
}
