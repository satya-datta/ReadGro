"use client";
import { useEffect, useState } from "react";
import earningsimage from "@/assets/images/icons8-cash-48.png";
import CounterDashboard from "@/components/shared/dashboards/CounterDashboard";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import axios from "axios";
import { useUserContext } from "@/contexts/UserContext";

const CounterStudent = () => {
  const { user } = useUserContext();

  const [earnings, setEarnings] = useState({
    todayEarnings: 0,
    last7DaysEarnings: 0,
    last30DaysEarnings: 0,
    overallEarnings: 0,
  });

  const [loadedImageUrl, setLoadedImageUrl] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user?.userId) return;

      try {
        const response = await axios.get(
          `https://readgro-backend.onrender.com/earnings/${user.userId}`
        );
        setEarnings(response.data);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    const fetchUserDetails = async () => {
      if (!user?.userId) return;

      try {
        const response = await fetch(
          `https://readgro-backend.onrender.com/getuser_details/${user.userId}`
        );
        const data = await response.json();
        if (data?.user?.avatar) {
          const img = new window.Image();
          img.src = data.user.avatar;
          img.onload = () => setLoadedImageUrl(data.user.avatar);
          img.onerror = () => setLoadedImageUrl(null);
        }

        // Fetch package details
        if (user?.package_id) {
          fetch(
            `https://readgro-backend.onrender.com/getpackage/${user.package_id}`
          )
            .then((res) => res.json())
            .then((packageData) => {
              if (packageData) {
                setPackageDetails(packageData);
              } else {
                setError("Package details not found");
              }
            })
            .catch(() => setError("Error fetching package details"));
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setLoadedImageUrl(null);
      }
    };

    fetchEarnings();
    fetchUserDetails();

    const interval = setInterval(fetchEarnings, 10000);
    return () => clearInterval(interval);
  }, [user?.userId]);

  const counts = [
    {
      name: "Today’s Earnings",
      image: earningsimage,
      data: `₹${earnings.todayEarnings}`,
    },
    {
      name: "Last 7 Days Earnings",
      image: earningsimage,
      data: `₹${earnings.last7DaysEarnings}`,
    },
    {
      name: "Last 30 Days Earnings",
      image: earningsimage,
      data: `₹${earnings.last30DaysEarnings}`,
    },
    {
      name: "Total Earnings",
      image: earningsimage,
      data: `₹${earnings.overallEarnings}`,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-0 w-full">
      <HeadingDashboard>Dashboard</HeadingDashboard>

      {/* Profile Card */}
      {/* Profile Card for Mobile and Desktop */}
      {loadedImageUrl && (
        <div className="mb-1">
          {/* Mobile View */}
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 md:hidden max-w-[300px] mx-auto">
            <img
              src={loadedImageUrl}
              alt="User Profile"
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                {packageDetails?.package_name || "Loading..."}
              </p>
            </div>
          </div>

          {/* Desktop/Laptop View */}
          <div className="hidden md:flex bg-gray-100 rounded-lg shadow-md p-4 items-center gap-6 max-w-xl mx-auto">
            <img
              src={loadedImageUrl}
              alt="User Profile"
              className="w-32 h-32 object-cover rounded-md"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-md text-blue-600 font-medium mt-1">
                {packageDetails?.package_name || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Earnings Section */}
      <CounterDashboard counts={counts} />
    </div>
  );
};

export default CounterStudent;
