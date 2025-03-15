import React, { useEffect, useState } from "react";

const WithDrawlRequest = ({ userId }) => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📌 Fetch Withdrawal Requests
  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(
          `https://readgro-backend.onrender.com/getwithdrawlrequests/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch withdrawal requests");
        }
        const data = await response.json();

        // Extracting the correct array from the response object
        if (data.withdrawalRequests && Array.isArray(data.withdrawalRequests)) {
          setWithdrawRequests(data.withdrawalRequests);
        } else {
          console.error(
            "Expected withdrawalRequests to be an array, but got:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };

    fetchWithdrawRequests();
  }, [userId]);

  // 📌 Handle Pay Button Click (Open OTP Modal)
  const handlePayClick = async (request) => {
    setSelectedRequest(request);
    setShowOtpModal(true);

    try {
      const response = await fetch(
        "https://readgro-backend.onrender.com/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // ✅ Ensure proper headers
          body: JSON.stringify({}), // ✅ Even if empty, some servers require a body
        }
      );
      console.log(response.json());
      if (!response.ok) {
        throw new Error(`Failed to send OTP: ${response.statusText}`);
      }

      console.log("OTP request sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // 📌 Handle OTP Submission & Payout Processing
  const handleOtpSubmit = async () => {
    if (!otp) return alert("Please enter OTP");
    setLoading(true);
    console.log(selectedRequest);
    try {
      const response = await fetch(
        "https://readgro-backend.onrender.com/process-payout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            amount: selectedRequest.amount,
            otp,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Payout processed successfully!");
        setWithdrawRequests((prev) =>
          prev.map((req) =>
            req.id === selectedRequest.id ? { ...req, status: "Paid" } : req
          )
        );
      } else {
        alert("Failed to process payout: " + data.message);
      }
    } catch (error) {
      console.error("Error processing payout:", error);
    }

    setShowOtpModal(false);
    setOtp("");
    setLoading(false);
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-left">
        <thead className="text-sm md:text-base text-black bg-lightGrey5 leading-1.8">
          <tr>
            <th className="px-5px py-10px">Request ID</th>
            <th className="px-5px py-10px">Amount</th>
            <th className="px-5px py-10px">Status</th>
            <th className="px-5px py-10px">Created Time</th>
            <th className="px-5px py-10px">Action</th>
          </tr>
        </thead>
        <tbody className="text-size-13 md:text-base text-contentColor">
          {withdrawRequests.length > 0 ? (
            withdrawRequests.map((request, index) => (
              <tr
                key={request.id}
                className={index % 2 === 0 ? "bg-lightGrey5" : ""}
              >
                <td className="px-5px py-10px">{request.id}</td>
                <td className="px-5px py-10px">{request.amount}</td>
                <td className="px-5px py-10px">{request.status}</td>
                <td className="px-5px py-10px">
                  {new Date(request.created_at).toLocaleString()}
                </td>
                <td className="px-5px py-10px">
                  {request.status.toLowerCase() === "pending" && (
                    <button
                      className="bg-primaryColor text-white px-4 py-2 rounded"
                      onClick={() => handlePayClick(request)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-10px">
                No withdrawal requests available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <h2 className="text-lg mb-3">Enter OTP</h2>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter OTP"
            />
            <div className="mt-3 flex justify-center gap-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleOtpSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify & Pay"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawlRequest;
