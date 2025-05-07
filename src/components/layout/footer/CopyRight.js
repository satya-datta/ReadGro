import Image from "next/image";
import React from "react";
import logoImage from "@/assets/images/rg.png";
import useIsSecondary from "@/hooks/useIsSecondary";

const CopyRight = () => {
  const { isSecondary } = useIsSecondary();

  return (
    <div className="pt-1 pb-1 border-t border-darkcolor">
      {isSecondary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Image src={logoImage} alt="ReadGro Logo" width={30} height={30} />
            <p className="text-base text-darkgray text-center sm:text-left">
              © 2025 Powered by{" "}
              <a href="#" className="hover:text-primaryColor">
                ReadGro
              </a>
              . All Rights Reserved.
            </p>
          </div>
          <ul className="flex items-center justify-center sm:justify-end gap-4">
            <li>
              <a
                href="#"
                className="text-base text-darkgray hover:text-primaryColor border-r border-darkgray pr-4"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base text-darkgray hover:text-primaryColor pl-4"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <Image src={logoImage} alt="ReadGro Logo" width={25} height={25} />
            <p className="text-whiteColor text-center lg:text-left">
              © <span className="text-primaryColor">2025</span> ReadGro. All
              Rights Reserved.
            </p>
          </div>
          <ul className="flex gap-2 lg:gap-3 justify-center lg:justify-end">
            {[
              { href: "https://www.facebook.com", icon: "facebook" },
              { href: "https://www.twitter.com", icon: "twitter" },
              { href: "https://www.vimeo.com", icon: "vimeo" },
              { href: "https://www.linkedin.com", icon: "linkedin" },
              { href: "https://www.skype.com", icon: "skype" },
            ].map(({ href, icon }) => (
              <li key={icon}>
                <a
                  href={href}
                  className="w-9 h-9 flex items-center justify-center text-whiteColor bg-whiteColor bg-opacity-10 hover:bg-primaryColor rounded-full"
                >
                  <i className={`icofont-${icon}`}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CopyRight;
