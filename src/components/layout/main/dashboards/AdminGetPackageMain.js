"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const AdminGetPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://readgro-backend.onrender.com/getallpackages"
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setPackages(data);
        } else {
          console.error("Failed to fetch packages:", data.message);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const response = await fetch(
        `https://readgro-backend.onrender.com/delete-package/${packageId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPackages((prev) =>
          prev.filter((pkg) => pkg.package_id !== packageId)
        );
        alert("Package deleted successfully.");
      } else {
        console.error("Failed to delete package:", data.message);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>
      <div className="overflow-auto">
        <table className="w-full text-left">
          <thead className="text-sm md:text-base bg-gray-100">
            <tr>
              <th className="px-5 py-2">Package Name</th>

              <th className="px-5 py-2">Price</th>
              <th className="px-5 py-2">Created At</th>
              <th className="px-5 py-2">Commission</th>
              <th className="px-5 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.package_id} className="border-b">
                <td className="px-5 py-2">{pkg.package_name}</td>

                <td className="px-5 py-2">{pkg.package_price}</td>
                <td className="px-5 py-2">{pkg.created_time}</td>
                <td className="px-5 py-2">{pkg.commission || "N/A"}</td>
                <td className="px-5 py-2 flex space-x-3">
                  {/* <Link href={`/admin-package/edit/${pkg.package_id}`}>
                    <button className="text-yellow-500 hover:underline">Edit</button>
                  </Link> */}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(pkg.package_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  No packages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGetPackages;
