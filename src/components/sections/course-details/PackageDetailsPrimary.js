"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import CoursesOfPackage from "../courses/CoursesOfPackage";
import { useUserContext } from "@/contexts/UserContext";

const PackageDetailsPrimary = ({ type, id }) => {
  const { user } = useUserContext();
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
      router.push("/user/user-enrolled-courses");
    } else {
      window.location.href = `/checkout?package=${packageDetails.package_name}`;
    }
  };

  const isUserLoggedIn = Boolean(user?.userId);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Error Loading Package
        </h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Package Details
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Package Header Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Package Image (if type 3) */}
            {type === 3 && packageDetails?.package_image && (
              <div className="lg:w-1/2">
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={`http://localhost:5000/uploads/${packageDetails.package_image}`}
                    alt={packageDetails.package_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Package Details Card */}
            <div
              className={`${
                type === 3 ? "lg:w-1/2" : "w-full"
              } bg-white rounded-xl shadow-lg overflow-hidden`}
            >
              <div className="p-6 md:p-8">
                {/* Package Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                    EXPERT PACKAGE
                  </span>
                </div>

                {/* Package Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {packageDetails?.package_name ||
                    "Affiliate Marketing Expert Package"}
                </h1>

                {/* Package Description */}
                <p className="text-lg text-gray-600 mb-6">
                  {packageDetails?.description ||
                    "Add the Learnings to Beginner"}
                </p>

                {/* Discount Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        Buy this course for ₹{packageDetails?.discount_price} by
                        using the referral code
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Section (only for non-logged-in users) */}
                {!isUserLoggedIn && (
                  <div className="mb-6">
                    <div className="flex items-end gap-4 mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{packageDetails?.package_price}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ₹
                        {(packageDetails?.package_price / (1 - 0.68)).toFixed(
                          2
                        )}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        68% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      One-time payment. Lifetime access.
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleButtonClick}
                  className="w-full bg-gradient-to-r bg-primaryColor to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  {isUserLoggedIn
                    ? "Explore Your Package"
                    : "Enroll Now for ₹" + packageDetails?.package_price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included Courses Section */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <CoursesOfPackage id={packageDetails?.package_id} />
        </div>
      </section>
    </main>
  );
};

export default PackageDetailsPrimary;
