"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import CoursesOfPackage from "../courses/CoursesOfPackage";
import { useUserContext } from "@/contexts/UserContext"; // Import User Context

const PackageDetailsPrimary = ({ type, id }) => {
  const { user } = useUserContext(); // Get user context
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
        } else {
          setError("Package details not found");
        }
      })
      .catch(() => setError("Failed to load package details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleButtonClick = () => {
    if (user?.userId) {
      // If user is logged in, navigate to enrolled courses
      router.push("/user/user-enrolled-courses");
    } else {
      // If user is not logged in, go to checkout
      window.location.href = `/checkout?package=${packageDetails.package_name}`;
    }
  };

  const isUserLoggedIn = Boolean(user?.userId); // Check if user is logged in

  if (loading) return <p className="text-center">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section data-aos="fade-up">
      <div className="bg-lightGrey10 dark:bg-lightGrey10-dark py-50px relative z-0">
        <div className="container">
          <ul className="flex gap-1">
            <li>
              <a
                href="/"
                className="text-lg text-blackColor2 dark:text-blackColor2-dark"
              >
                Home <i className="icofont-simple-right"></i>
              </a>
            </li>
            <li>
              <span className="text-lg text-blackColor2 dark:text-blackColor2-dark">
                Package Details
              </span>
            </li>
          </ul>
          <div className="pt-70px">
            <h4 className="text-4xl font-bold text-blackColor dark:text-blackColor-dark mb-15px">
              {packageDetails?.package_name}
            </h4>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {type === 3 && packageDetails?.package_image && (
              <img
                src={`http://localhost:5000/uploads/${packageDetails.package_image}`}
                alt={packageDetails.package_name}
                className="w-full h-[450px] object-cover rounded-md"
              />
            )}
            <div className="py-5 px-6 shadow-lg bg-white dark:bg-gray-800 rounded-md">
              {/* Package Name */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {packageDetails?.package_name}
              </h2>

              {/* Package Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {packageDetails?.description}
              </p>

              {/* Referral Code (if exists) */}
              <div className="mb-4 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-3 rounded-md">
                <p className="font-semibold">
                  🔥 Buy this course for{" "}
                  <span className="text-green-600">
                    ₹{packageDetails.discount_price}
                  </span>{" "}
                  by using the referral code
                </p>
              </div>

              {/* Show price & discount only if user is not logged in */}
              {!isUserLoggedIn && (
                <div className="flex justify-between items-center mb-5">
                  <div className="text-xl font-bold text-primaryColor">
                    ₹{packageDetails?.package_price}
                    <del className="text-sm text-gray-400 ml-2">
                      ₹{(packageDetails?.package_price / (1 - 0.68)).toFixed(2)}
                    </del>
                  </div>
                  <span className="text-sm font-semibold text-red-500 bg-gray-100 px-2 rounded">
                    68% OFF
                  </span>
                </div>
              )}

              {/* Buy Now or Explore Button */}
              <button
                className="w-full text-lg text-white bg-secondaryColor px-6 py-3 rounded hover:bg-secondaryColor-dark"
                onClick={handleButtonClick}
              >
                {isUserLoggedIn ? "Explore" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-10 md:py-50px lg:py-60px 2xl:py-100px">
        <CoursesOfPackage id={packageDetails?.package_id} />
      </div>
    </section>
  );
};

export default PackageDetailsPrimary;
