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
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-full">
      <HeadingDashboard>Dashboard</HeadingDashboard>

      {/* Profile Image - Only visible on mobile screens */}
      {loadedImageUrl && (
        <div className="flex justify-center my-6 md:hidden">
          <img
            src={loadedImageUrl}
            alt="User Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      )}

      {/* Earnings Section */}
      <CounterDashboard counts={counts} />
    </div>
  );
};

export default CounterStudent;
