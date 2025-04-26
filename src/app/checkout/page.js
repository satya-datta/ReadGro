"use client";
import { useSearchParams } from "next/navigation";
import CheckoutMain from "@/components/layout/main/ecommerce/CheckoutMain";
import ThemeController from "@/components/shared/others/ThemeController";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Checkout = () => {
  const searchParams = useSearchParams(); // ✅ Use inside the component
  const packagename = searchParams.get("package");

  console.log("Package Name:", packagename); // ✅ Now it will display in console

  return (
    <PageWrapper>
      <main>
        <CheckoutMain packagename={packagename} />
      </main>
    </PageWrapper>
  );
};

export default Checkout;
