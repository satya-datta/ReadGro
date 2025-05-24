"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

const PricingPlans = () => {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [courseCounts, setCourseCounts] = useState({});
  const [courseNames, setCourseNames] = useState({});

  useEffect(() => {
    fetch("https://readgro-backend.onrender.com/getallpackages")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPackages(data);
          data.forEach((pkg) => fetchCourseCount(pkg.package_id));
        }
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const fetchCourseCount = (packageId) => {
    fetch(`https://readgro-backend.onrender.com/getcoursemappings/${packageId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const courseIds = data.map((course) => course.course_id);
          setCourseCounts((prevCounts) => ({
            ...prevCounts,
            [packageId]: data.length,
          }));

          if (courseIds.length > 0) {
            fetch("https://readgro-backend.onrender.com/getcoursedetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ course_ids: courseIds }),
            })
              .then((res) => res.json())
              .then((courseData) => {
                if (Array.isArray(courseData.courses)) {
                  const firstThree = courseData.courses
                    .slice(0, 3)
                    .map((c) => c.name);
                  setCourseNames((prev) => ({
                    ...prev,
                    [packageId]: {
                      names: firstThree,
                      total: courseIds.length,
                    },
                  }));
                }
              })
              .catch((error) =>
                console.error("Error fetching course details:", error)
              );
          }
        }
      })
      .catch((error) =>
        console.error(`Error fetching courses for package ${packageId}:`, error)
      );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Packages
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={pkg.package_image ? `${pkg.package_image}` : freeImage}
                alt={pkg.package_name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {pkg.package_name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
              <div className="text-left ml-2">
                {pkg.package_id === 1 ? (
                  <p className="text-gray-800 font-medium">
                    ✅ GET Basic Package Courses
                  </p>
                ) : (
                  previousPackages[pkg.package_id] && (
                    <p className="text-gray-800 font-medium">
                      ✅ Free {previousPackages[pkg.package_id]} Courses
                    </p>
                  )
                )}
              </div>
              <div className="text-left mb-2 ml-2 text-sm">
                {courseNames[pkg.package_id]?.names.map((name, idx) => (
                  <p key={idx} className="text-gray-800 text-base font-medium">
                    ✅ {name}
                  </p>
                ))}
                {courseNames[pkg.package_id]?.total > 3 && (
                  <p className="text-gray-500 text-sm">
                    + {courseNames[pkg.package_id].total - 3} more courses
                  </p>
                )}
              </div>

              {/* <p className="text-2xl font-bold text-gray-900 mb-4 text-right">
                ₹{pkg.package_price}
              </p> */}

              {/* <p className="text-gray-600 text-sm mb-2">
                Duration: {pkg.duration} days
              </p> */}

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => router.push(`/package/${pkg.package_id}`)}
              >
                Subscribe ₹{pkg.package_price}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
