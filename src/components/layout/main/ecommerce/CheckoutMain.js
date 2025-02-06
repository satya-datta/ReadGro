import CheckoutPrimary from "@/components/sections/checkout/CheckoutPrimary";
import CheckoutWeb from "@/components/sections/checkout/CheckoutWeb";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CheckoutMain = ({packageId}) => {
  console.log(packageId);
  return (
    <>
      <HeroPrimary path={"Checkout"} title={"Checkout"} />
      <CheckoutWeb  packageId={packageId}/>
    </>
  );
};

export default CheckoutMain;
