import React, { useEffect, useState } from "react";
import FooterNavItems from "./FooterNavItems";
import FooterAbout from "./FooterAbout";
import FooterRecentPosts from "./FooterRecentPosts";

const FooterNavList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://readgro-backend.onrender.com/getallpackages"
        );
        const data = await response.json();

        // Assuming each item has a "name" field
        const formatted = data.map((pkg) => ({
          name: pkg.package_name,
          path: `/packages/${pkg.package_id}`, // Customize path if needed
        }));

        setPackages(formatted);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const lists = [
    {
      heading: "Usefull Links",
      items: [
        {
          name: "About Us",
          path: "/about",
        },
        {
          name: "Courses",
          path: "/courses",
        },
        {
          name: "Select Plan & Register",
          path: "/packages",
        },
        {
          name: "User Login",
          path: "/user/login",
        },
        {
          name: "Contact Us",
          path: "/contact",
        },
      ],
    },
    {
      heading: "Plans",
      items:
        packages.length > 0
          ? packages
          : [
              {
                name: "Loading...",
                path: "#",
              },
            ],
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-2 lg:grid-cols-12 gap-30px md:gap-y-5 lg:gap-y-0 pt-60px pb-50px md:pt-30px md:pb-30px lg:pt-110px lg:pb-20">
        {/* left */}
        <FooterAbout />

        {/* nav area */}
        {lists.map((list, idx) => (
          <FooterNavItems key={idx} list={list} idx={idx} />
        ))}

        {/* right */}
        {/* <FooterRecentPosts /> */}
      </div>
    </section>
  );
};

export default FooterNavList;
