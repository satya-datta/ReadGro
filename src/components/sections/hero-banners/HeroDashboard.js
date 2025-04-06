"use client";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import Image from "next/image";
import { useState } from "react";

const HeroDashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint to clear the adminToken cookie
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        console.log("Logout successful");
        window.location.href = "/admin/Gnaneswar/login"; // Redirect to the login page
      } else {
        console.error("Failed to logout");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false); // Close the popup
    }
  };

  return (
    <section>
      <div className="container-fluid-2">
        <div className="bg-primaryColor p-5 md:p-10 rounded-5 flex justify-center md:justify-between items-center flex-wrap gap-2">
          <div className="flex items-center flex-wrap justify-center sm:justify-start">
            <div className="mr-10px lg:mr-5">
              <Image
                src={dashboardImage2}
                alt="Admin Profile"
                className="w-27 h-27 md:w-22 md:h-22 lg:w-27 lg:h-27 rounded-full p-1 border-2 border-darkdeep7 box-content"
              />
            </div>
            <div className="text-whiteColor font-bold text-center sm:text-start">
              <h5 className="text-xl leading-1.2 mb-5px">Hello</h5>
              <h2 className="text-2xl leading-1.24">Gnaneswar</h2>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowLogoutPopup(true)}
              className="text-size-15 border text-whiteColor bg-primaryColor border-whiteColor hover:text-primaryColor px-25px py-10px hover:bg-whiteColor rounded group text-nowrap flex gap-1 items-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
