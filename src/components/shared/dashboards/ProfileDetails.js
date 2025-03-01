"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";

const ProfileDetails = () => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      fetchUserData(user.userId);
    }
  }, [user?.userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/getuser_details/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setEditableData({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          address: data.user.Address,
          pincode: data.user.Pincode,
          avatar: data.user.avatar, // Store current profile image URL
        });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    Object.keys(editableData).forEach((key) => {
      formData.append(key, editableData[key]);
    });
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }
 
    try {
      const response = await fetch(`http://localhost:5000/update_user/${user?.userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Profile updated successfully");
        setIsEditing(false);
        fetchUserData(user.userId);
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* Profile Image Upload */}
      <div className="mb-4">
        <label className="font-semibold">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block mt-2" />
        <div className="mt-2">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : editableData.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      </div>

      {userData ? (
        <div>
          <ul>
            {["name", "email", "phone", "address", "pincode"].map((field) => (
              <li key={field} className="mb-3">
                <label className="font-semibold capitalize">{field.replace("_", " ")}</label>
                <input
                  type="text"
                  name={field}
                  value={editableData[field] || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded mt-1"
                />
              </li>
            ))} 
          </ul>

          {/* Edit / Save Button */}
          {!isEditing ? (
            <button onClick={handleEditClick} className="mt-4 p-2 bg-green-500 text-white rounded">
              Want To Edit
            </button>
          ) : (
            <button onClick={handleSaveChanges} className="mt-4 p-2 bg-green-500 text-white rounded">
              Save Changes
            </button>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ProfileDetails;
