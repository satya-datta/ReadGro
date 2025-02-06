import React, { useEffect, useState } from "react";
import DropdownPrimary from "./DropdownPrimary";

const PackagesDropdown = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/getallpackages");
        const data = await response.json();

        // Transform data to match the required structure
        const formattedItems = data.map((pkg) => ({
          name: pkg.package_name, // Assuming backend returns a "name" field
          status: null,
          path: `/packages/${pkg.package_id}`, // Dynamic path
          type: "secondary", // Set type as "secondary"
        }));
        console.log(formattedItems);
        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return <DropdownPrimary items={items} />;
};

export default PackagesDropdown;
