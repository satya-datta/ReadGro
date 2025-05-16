"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AdminGetUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/getallusers"); // API endpoint for fetching users
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users); // Update the state with fetched users
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          Manage Users
        </h2>
      </div>
      <div>
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead className="text-sm md:text-base text-blackColor dark:text-blackColor-dark bg-lightGrey5 dark:bg-whiteColor-dark leading-1.8 md:leading-1.8">
              <tr>
                <th className="px-5px py-10px md:px-5">User Name</th>
                <th className="px-5px py-10px md:px-5">User ID</th>
                <th className="px-5px py-10px md:px-5">Referral Code</th>
                <th className="px-5px py-10px md:px-5">Balance</th>
                <th className="px-5px py-10px md:px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
              {users.map((user, index) => (
                <tr key={index} className="leading-1.8 md:leading-1.8">
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {user.Name}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {user.userId}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {user.generatedReferralCode}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {user.balance}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`../Gnaneswar/admin-users/manageuser/${user.userId}`}
                        className="hover:text-primary"
                      >
                        <ButtonPrimary type="submit">View</ButtonPrimary>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-5">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminGetUsers;
