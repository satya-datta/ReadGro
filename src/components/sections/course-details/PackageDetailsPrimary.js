"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
        } else {
          setError("Package details not found");
        }
      })
      .catch(() => setError("Failed to load package details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = () => {
    if (packageDetails) {
      window.location.href = `/checkout?package=${packageDetails.package_name}`;
    }
  };

  if (loading) return <p className="text-center">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section data-aos="fade-up">
      <div className="bg-lightGrey10 dark:bg-lightGrey10-dark py-50px relative z-0">
        <div className="container">
          <ul className="flex gap-1">
            <li>
              <a href="/" className="text-lg text-blackColor2 dark:text-blackColor2-dark">
                Home <i className="icofont-simple-right"></i>
              </a>
            </li>
            <li>
              <span className="text-lg text-blackColor2 dark:text-blackColor2-dark">Package Details</span>
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
              <div className="flex justify-between items-center mb-5">
                <div className="text-xl font-bold text-primaryColor">
                  ₹{packageDetails?.package_price}
                  <del className="text-sm text-gray-400 ml-2">
                    /{(packageDetails?.package_price / (1 - 0.68)).toFixed(2)}
                  </del>
                </div>
                <span className="text-sm font-semibold text-red-500 bg-gray-100 px-2 rounded">
                  68% OFF
                </span>
              </div>
              <button
                className="w-full text-lg text-white bg-secondaryColor px-6 py-3 rounded hover:bg-secondaryColor-dark"
                onClick={handleBuyNow}
              >
                Buy Now
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
