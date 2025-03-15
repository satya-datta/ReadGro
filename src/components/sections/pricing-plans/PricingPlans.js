"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBook } from "react-icons/fa";
import freeImage from "@/assets/images/icon/price__1.png";

const PackageWeb = () => {
  const [packages, setPackages] = useState([]);
  const [courseCounts, setCourseCounts] = useState({});
  const [previousPackages, setPreviousPackages] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("https://readgro-backend.onrender.com/getallpackages")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPackages(data);
          data.forEach((pkg) => {
            fetchCourseCount(pkg.package_id);
            if (pkg.package_id > 1) {
              fetchPreviousPackage(pkg.package_id);
            }
          });
        } else {
          console.error("Packages data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const fetchCourseCount = (packageId) => {
    fetch(`https://readgro-backend.onrender.com/getcoursemappings/${packageId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourseCounts((prevCounts) => ({
            ...prevCounts,
            [packageId]: data.length,
          }));
        } else {
          console.error(
            `Courses data for package ${packageId} is not an array`,
            data
          );
        }
      })
      .catch((error) =>
        console.error(`Error fetching courses for package ${packageId}:`, error)
      );
  };

  const fetchPreviousPackage = (packageId) => {
    fetch(`https://readgro-backend.onrender.com/getpackage/${packageId - 1}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousPackages((prev) => ({
          ...prev,
          [packageId]: data.package_name,
        }));
      })
      .catch((error) =>
        console.error(`Error fetching previous package ${packageId}:`, error)
      );
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📦 Explore Our Packages
      </h1>

      {packages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
              onClick={() => router.push(`/packages/${pkg.package_id}`)}
            >
              <img
                src={
                  pkg.package_image
                    ? `https://readgro-backend.onrender.com/uploads/${pkg.package_image}`
                    : freeImage
                }
                alt={pkg.package_name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-1">
                  {pkg.package_name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                  <span className="flex items-center gap-1 ml-3">
                    <FaBook size={18} className="text-yellow-500" />
                    {courseCounts[pkg.package_id] || "Loading..."} Courses
                  </span>
                  <p className="text-lg font-bold text-black mr-8">
                    ₹{pkg.package_price}
                  </p>
                </div>
                <div className="text-left ml-2">
                  <p className="text-gray-500 font-medium">
                    🎁 Get up to {pkg.commission || 0}₹ on referral
                  </p>

                  {pkg.package_id === 1 ? (
                    <p className="text-gray-500 font-medium">
                      ✅ GET Basic Package Courses
                    </p>
                  ) : (
                    previousPackages[pkg.package_id] && (
                      <p className="text-gray-600 font-medium">
                        ✅ Free {previousPackages[pkg.package_id]} Courses
                      </p>
                    )
                  )}
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full">
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Packages Available</p>
      )}
    </section>
  );
};

export default PackageWeb;
