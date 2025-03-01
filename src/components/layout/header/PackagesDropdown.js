import React, { useEffect, useState } from "react";
import DropdownPrimary from "./DropdownPrimary";

// Define and export fetchPackages
export const fetchPackages = async () => {
  try {
    const response = await fetch("http://localhost:5000/getallpackages");
    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }
    const data = await response.json();

    // Transform data to match the required structure
    return data.map((pkg) => ({
      name: pkg.package_name, // Assuming backend returns a "package_name" field
      status: null,
      path: `/packages/${pkg.package_id}`, // Dynamic path
      type: "secondary", // Set type as "secondary"
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // Return an empty array in case of error
  }
};

const PackagesDropdown = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      const packages = await fetchPackages();
      setItems(packages);
      setLoading(false);
    };

    loadPackages();
  }, []);

  if (loading) return <p>Loading packages...</p>;

  return <DropdownPrimary items={items} />;
};

export default PackagesDropdown;
