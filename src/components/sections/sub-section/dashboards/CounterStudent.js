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

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user?.userId) return; // Ensure userId is available before fetching

      try {
        const response = await axios.get(
          `https://readgro-backend.onrender.com/earnings/${user.userId}`
        );
        setEarnings(response.data);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    // Fetch initially
    fetchEarnings();

    // Poll every 10 seconds
    const interval = setInterval(fetchEarnings, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [user?.userId]); // Refetch when userId changes

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
    <CounterDashboard counts={counts}>
      <HeadingDashboard>Dashboard</HeadingDashboard>
    </CounterDashboard>
  );
};

export default CounterStudent;
