"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getAllCourses from "@/libs/getAllCourses";

import PackageEnroll from "@/components/shared/course-details/PackageEnroll";
import CoursesWeb from "../courses/CoursesWeb";
import BalbImage from "@/components/shared/animaited-images/BalbImage";
import BookImage from "@/components/shared/animaited-images/BookImage";
import GlobImage from "@/components/shared/animaited-images/GlobImage";
import TriangleImage from "@/components/shared/animaited-images/TriangleImage";
import PopupVideo from "@/components/shared/popup/PopupVideo";

import blogImage7 from "@/assets/images/blog/blog_7.png";
import CoursesOfPackage from "../courses/CoursesOfPackage";

const PackageDetailsPrimary = ({ type, id }) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/getpackage/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPackageDetails(data);
          setLoading(false);
        } else {
          setError("Package details not found");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching package details:", err);
        setError("Failed to load package details");
        setLoading(false);
      });
  }, [id]);

  const handleBuyNow = () => {
    if (packageDetails) {
      const checkoutUrl = `/checkout?packageId=${packageDetails.package_id}`;
      window.location.href = checkoutUrl; 
    }
  };

  if (loading) return <p className="text-center">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section data-aos="fade-up">
      {/* Banner Section */}
      <div className={`bg-lightGrey10 dark:bg-lightGrey10-dark relative z-0 overflow-y-visible ${type === 3 ? "pt-50px" : "py-50px"}`}>
        {/* Animated Icons */}
        <div>
          <BookImage type={"secondary"} />
          <GlobImage type={"secondary"} />
          <BalbImage type={"secondary"} />
          <TriangleImage type={"secondary"} />
        </div>
        <div className="container">
          <div>
            <ul className="flex gap-1">
              <li>
                <a href="/" className="text-lg text-blackColor2 dark:text-blackColor2-dark">
                  Home <i className="icofont-simple-right"></i>
                </a>
              </li>
              <li>
                <span className="text-lg text-blackColor2 dark:text-blackColor2-dark">Package-Details</span>
              </li>
            </ul>
            <div className="pt-70px">
              {/* Package Name */}
              <h4 className="text-size-32 md:text-4xl font-bold text-blackColor dark:text-blackColor-dark mb-15px leading-43px md:leading-14.5" data-aos="fade-up">
                {packageDetails?.package_name}
              </h4>

              {/* Price and Rating */}
              <div className="flex gap-5 flex-wrap items-center mb-30px" data-aos="fade-up">
                <div className="flex items-center">
                  <i className="icofont-book-alt pr-5px text-primaryColor text-sm"></i>
                  <span className="text-sm text-black dark:text-blackColor-dark font medium">23 Lessons</span>
                </div>
                <div className="text-start md:text-end">
                  <i className="icofont-star text-size-15 text-yellow"></i>
                  <i className="icofont-star text-size-15 text-yellow"></i>
                  <i className="icofont-star text-size-15 text-yellow"></i>
                  <i className="icofont-star text-size-15 text-yellow"></i>
                  <i className="icofont-star text-size-15 text-yellow"></i>
                  <span className="text-xs text-blackColor dark:text-blackColor-dark">(44)</span>
                </div>
                <div>
                  <p className="text-sm text-contentColor dark:text-contentColor-dark font-medium">
                    Last Update: <span className="text-blackColor dark:text-blackColor-dark">Sep 29, 2024</span>
                  </p>
                </div>
              </div>

              {/* Package Image & Video */}
              {type === 3 && packageDetails.package_image && (
                <div className="overflow-hidden relative mb-5">
                   <img
      src={`http://localhost:5000/uploads/${packageDetails.package_image}`}
      alt={packageDetails.package_name}
      className="w-full h-[450px] object-cover"
    />   <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-10">
              
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="container py-10 md:py-50px lg:py-60px 2xl:py-100px">

        <CoursesOfPackage card={true} id={packageDetails?.package_id} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-30px">
          {/* Course Sidebar */}
          <div className={`lg:col-start-9 lg:col-span-4 ${type === 2 || type === 3 ? "relative lg:top-[-740px]" : ""}`}>
            {/* <PackageEnroll type={type}  price={packageDetails?.package_price}/> */}
            <div
      className="py-33px px-25px shadow-event mb-30px bg-whiteColor dark:bg-whiteColor-dark rounded-md"
      data-aos="fade-up"
    >
     
      {/* meeting thumbnail  */}

      <div
        className={`flex justify-between  ${
          type === 2 ? "mt-50px mb-5" : type === 3 ? "mb-50px" : "mb-5"
        }`}
      >
        <div className="text-size-21 font-bold text-primaryColor font-inter leading-25px">
        ₹{packageDetails?.package_price}

          <del className="text-sm text-lightGrey4 font-semibold">/{(packageDetails?.package_price / (1 - 0.68)).toFixed(2)}</del>
        </div>
        <div>
          <a
            href="#"
            className="uppercase text-sm font-semibold text-secondaryColor2 leading-27px px-2 bg-whitegrey1 dark:bg-whitegrey1-dark"
          >
            68% OFF
          </a>
        </div>
      </div>
      <div className="mb-5" data-aos="fade-up">
        
        <button 
          className="w-full text-size-15 text-whiteColor bg-secondaryColor px-25px py-10px mb-10px leading-1.8 border border-secondaryColor hover:text-secondaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-secondaryColor dark:hover:bg-whiteColor-dark"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

       
      </div>
     
      
    </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetailsPrimary;