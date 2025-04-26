import CheckoutWeb from "@/components/sections/checkout/CheckoutWeb";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CheckoutMain = ({ packagename }) => {
  console.log(packagename);
  return (
    <>
      {/* <HeroPrimary path={"Checkout"} title={"Checkout"} /> */}
      <CheckoutWeb packagename={packagename} />
    </>
  );
};

export default CheckoutMain;
