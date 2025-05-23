"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { fetchPackages } from "@/components/layout/header/PackagesDropdown";

const UserAffiliateForm = () => {
  const { user } = useUserContext();
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      fetchReferralCode(user.userId);
    }
    loadPackages();
  }, [user?.userId]);

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
        if (data.user.generatedReferralCode) {
          setReferralCode(data.user.generatedReferralCode);
          setReferralLink(
            `https://read-gro-fm6j.vercel.app/?referralcode=${data.user.generatedReferralCode}`
          );
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  const loadPackages = async () => {
    const packageList = await fetchPackages();
    setPackages(packageList);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const generatePackageLink = () => {
    if (!selectedPackage) return;
    const newLink = `${referralLink}&package=${selectedPackage}`;
    setGeneratedLink(newLink);
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">AFFILIATE LINKS</h2>

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
            className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
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
            className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
          >
            Copy Referral Code
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Generate Link For Package */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Generate Link For Package
        </label>
        <div className="flex">
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1 bg-gray-100 text-sm"
          >
            <option value="">-- Select Package --</option>
            {packages.map((pkg) => (
              <option key={pkg.path} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>
          <button
            onClick={generatePackageLink}
            disabled={!selectedPackage}
            className={`ml-2 px-4 py-2 text-sm font-medium rounded-md ${
              selectedPackage
                ? "bg-primaryColor text-white hover:bg-purple-700"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
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
              className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
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
