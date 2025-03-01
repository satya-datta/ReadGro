"use client";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";

const UserHeroDashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { user, isUserAuthenticated } = useUserContext();
  const [userImage, setUserImage] = useState(dashboardImage2); // Default profile image

  useEffect(() => {
    console.log(user?.userId);
    if (user?.userId) {
     
      fetchUserImage(user?.userId);
    }
  }, [user?.userId]);
  const fetchUserImage = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/getuser_details/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      if (response.ok) {
        const data = await response.json();
          
     
          setUserImage(data.user.avatar);
      
       
      } else {
        console.error("Failed to fetch user image");
      }
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/userlogout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        window.location.href = "/"; // Redirect to the login page
      } else {
        console.error("Failed to logout");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false);
    }
  };

  return (
    <section>
      <div className="container-fluid-2">
        <div className="bg-primaryColor p-5 md:p-10 rounded-5 flex justify-center md:justify-between items-center flex-wrap gap-2">
          <div className="flex items-center flex-wrap justify-center sm:justify-start">
          <div className="mr-10px lg:mr-5">
  {userImage ? (
    <img
      src={`http://localhost:5000/uploads/${userImage}`}
      alt="User Profile"
      width={100}
      height={100}
      className="w-27 h-27 md:w-22 md:h-22 lg:w-27 lg:h-27 rounded-full p-1 border-2 border-darkdeep7 box-content"
    />
  ) : (
    <Image
      src={dashboardImage2}
      alt="Default Profile"
      width={100}
      height={100}
      className="w-27 h-27 md:w-22 md:h-22 lg:w-27 lg:h-27 rounded-full p-1 border-2 border-darkdeep7 box-content"
    />
  )}
</div>

            <div className="text-whiteColor font-bold text-center sm:text-start">
              <h5 className="text-xl leading-1.2 mb-5px">HELLO</h5>
              <h2 className="text-2xl leading-1.24">{user?.name?.toUpperCase()}</h2>

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

export default UserHeroDashboard;
