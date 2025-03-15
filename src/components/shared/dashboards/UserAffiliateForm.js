"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { fetchPackages } from "@/components/layout/header/PackagesDropdown"; // Import fetchPackages

const UserAffiliateForm = () => {
  const { user } = useUserContext();
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("All Packages");
  const [generatedLink, setGeneratedLink] = useState("");
  const [packages, setPackages] = useState([]); // Store fetched packages

  useEffect(() => {
    if (user?.userId) {
      fetchReferralCode(user.userId);
    }
    loadPackages(); // Fetch packages when component mounts
  }, [user?.userId]);

  // Fetch referral code from the API when the component loads
  const fetchReferralCode = async (userId) => {
    try {
      const response = await fetch(
        `https://readgro-backend.onrender.com/getuser_details/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.user.generatedReferralCode) {
          setReferralCode(data.user.generatedReferralCode);
          setReferralLink(
            `http://localhost:3000?referralcode=${data.user.generatedReferralCode}`
          );
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  // Fetch packages from API
  const loadPackages = async () => {
    const packageList = await fetchPackages();
    setPackages(packageList);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const generatePackageLink = () => {
    const newLink = `${referralLink}&package=${selectedPackage}`;
    setGeneratedLink(newLink);
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold text-purple-700 mb-4">
        Affiliate Links
      </h2>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          My Referral Link
        </label>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
          />
          <button
            onClick={() => copyToClipboard(referralLink)}
            className="bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
          >
            Copy Referral Link
          </button>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          My Referral Code
        </label>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
          />
          <button
            onClick={() => copyToClipboard(referralCode)}
            className="bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
          >
            Copy Referral Code
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Generate Link For */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Generate Link For
        </label>
        <div className="flex">
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1 bg-gray-100 text-sm"
          >
            <option value="All Packages">All Packages</option>
            {packages.map((pkg) => (
              <option key={pkg.path} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>
          <button
            onClick={generatePackageLink}
            className="ml-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
          >
            Generate Link
          </button>
        </div>
      </div>

      {/* Generated Link */}
      {generatedLink && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Generated Package Link
          </label>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
            />
            <button
              onClick={() => copyToClipboard(generatedLink)}
              className="bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAffiliateForm;
