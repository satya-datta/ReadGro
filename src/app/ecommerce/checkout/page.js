"use client";
import { useSearchParams } from "next/navigation";
import CheckoutMain from "@/components/layout/main/ecommerce/CheckoutMain";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Checkout | Edurock - Education LMS Template",
  description: "Checkout | Edurock - Education LMS Template",
};

const Checkout = () => {
  const searchParams = useSearchParams(); // ✅ Use inside the component
  const packageId = searchParams.get("packageId");

  console.log("Package Id:", packageId); // ✅ Now it will display in console

  return (
    <PageWrapper>
      <main>
        <CheckoutMain packageId={packageId} />
        <ThemeController />
      </main>
    </PageWrapper>
  );
};

export default Checkout;
