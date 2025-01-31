import React, { useEffect, useState } from "react";

const WithDrawlRequest = ({ userId }) => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getwithdrawlrequests/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch withdrawal requests");
        }
        const data = await response.json();
    
        // Extracting the correct array from the response object
        if (data.withdrawalRequests && Array.isArray(data.withdrawalRequests)) {
          setWithdrawRequests(data.withdrawalRequests);
        } else {
          console.error("Expected withdrawalRequests to be an array, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };
    

    fetchWithdrawRequests();
  }, [userId]);

  return (
    <div className="overflow-auto">
      <table className="w-full text-left">
        <thead className="text-sm md:text-base text-blackColor dark:text-blackColor-dark bg-lightGrey5 dark:bg-whiteColor-dark leading-1.8 md:leading-1.8">
          <tr>
            <th className="px-5px py-10px md:px-5">Withdrawl Request ID</th>
            <th className="px-5px py-10px md:px-5">Amount</th>
            <th className="px-5px py-10px md:px-5">Status</th>
            <th className="px-5px py-10px md:px-5">Created Time</th>
            <th className="px-5px py-10px md:px-5">Action</th>
          </tr>
        </thead>
        <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
          {/* Safely map over withdrawRequests, ensuring it's an array */}
          {Array.isArray(withdrawRequests) && withdrawRequests.length > 0 ? (
            withdrawRequests.map((request, index) => (
              <tr key={request.id} className={`${index % 2 === 0 ? "bg-lightGrey5 dark:bg-whiteColor-dark" : ""}`}>
                <td className="px-5px py-10px md:px-5">{request.id}</td>
                <td className="px-5px py-10px md:px-5">{request.amount}</td>
                <td className="px-5px py-10px md:px-5">{request.status}</td>
                <td className="px-5px py-10px md:px-5">{new Date(request.created_at).toLocaleString()}</td>
                <td className="px-5px py-10px md:px-5">
                  {request.status.toLowerCase() === "pending" && (
                    <button className="bg-primaryColor text-white px-4 py-2 rounded">
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
    </div>
  );
};

export default WithDrawlRequest;
