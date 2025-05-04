"use client";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import Image from "next/image";
import { useState } from "react";

const HeroDashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    try {
      // Remove the admin token from localStorage
      localStorage.removeItem("adminToken");

      console.log("Logout successful");

      // Redirect to the login page
      window.location.href = "/admin/Gnaneswar/login";
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false); // Close the popup
    }
  };

  return (
    <section>
      <div className="container-fluid-2 relative w-full px-4 md:px-8">
        {/* Glowing Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green via-emerald-400 to-green opacity-20 blur-3xl"></div>

        {/* Foreground Content */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-60 backdrop-blur-xl p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 relative w-24 h-24">
              <Image
                src={dashboardImage2}
                alt="Admin Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="text-green-100">
              <h5 className="text-lg font-semibold">HELLO</h5>
              <h2 className="text-3xl font-bold">GNANESWAR</h2>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="px-6 py-2 bg-white text-green-600 font-semibold rounded-full shadow hover:bg-primaryColor-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroDashboard;
