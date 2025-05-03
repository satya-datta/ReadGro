"use client";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";

const UserHeroDashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { user } = useUserContext();
  const [loadedImageUrl, setLoadedImageUrl] = useState(null);

  useEffect(() => {
    if (user?.avatar) {
      const fullImageUrl = `http://localhost:5000/uploads/${user.avatar}`;

      // Preload image
      const img = new window.Image();
      img.src = fullImageUrl;
      img.onload = () => setLoadedImageUrl(fullImageUrl);
      img.onerror = () => setLoadedImageUrl(null); // fallback in case of failure
    }
  }, [user?.avatar]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/userlogout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false);
    }
  };

  return (
    <section>
      <div className="container-fluid-2 relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 opacity-20 blur-3xl"></div>

        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-60 backdrop-blur-xl p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              {loadedImageUrl ? (
                <img
                  src={loadedImageUrl}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <NextImage
                  src={dashboardImage2}
                  alt="Default Profile"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              )}
            </div>
            <div className="text-green-100">
              <h5 className="text-lg font-semibold">HELLO</h5>
              <h2 className="text-3xl font-bold">
                {user?.name?.toUpperCase()}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="px-6 py-2 bg-white text-green-600 font-semibold rounded-full shadow hover:bg-green-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

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

export default UserHeroDashboard;
