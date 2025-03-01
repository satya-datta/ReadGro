import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { FetchWallet, deductWalletBalance } from "@/libs/FetchWallet";
import { createOrder,validatePayment } from "@/libs/PaymentOrder";

const PlanCard = ({ package_id, userCurrentPackage }) => {
    const router = useRouter();
    const { user } = useUserContext();
    const userId = user?.userId;

    const [packageData, setPackageData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [previousPackageName, setPreviousPackageName] = useState("");
    const [totalCourses, setTotalCourses] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showInsufficientPopup, setShowInsufficientPopup] = useState(false);

    // Load Razorpay script dynamically once
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    useEffect(() => {
        console.log("Show Popup:", showPopup);
    }, [showPopup]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/getpackage/${package_id}`)
            .then((res) => res.json())
            .then((data) => setPackageData(data))
            .catch((error) => console.error("Error fetching package details:", error));
    }, [package_id]);

    useEffect(() => {
        fetch(`http://localhost:5000/getcoursemappings/${package_id}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const courseIds = data.map((course) => course.course_id);
                    setTotalCourses(data.length);
                    
                    fetch("http://localhost:5000/getcoursedetails", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ course_ids: courseIds }),
                    })
                        .then((res) => res.json())
                        .then((courseData) => {
                            if (courseData && Array.isArray(courseData.courses)) {
                                setCourses(courseData.courses.slice(0, 3));
                            }
                        })
                        .catch((error) => console.error("Error fetching course details:", error));
                }
            })
            .catch((error) => console.error("Error fetching courses for package:", error));
    }, [package_id]);

    useEffect(() => {
        if (package_id > 1) {
            fetch(`http://localhost:5000/getpackage/${package_id - 1}`)
                .then((res) => res.json())
                .then((data) => setPreviousPackageName(data.package_name))
                .catch((error) => console.error("Error fetching previous package details:", error));
        }
    }, [package_id]);

    if (!packageData) return <div>Loading...</div>;

    const userPackageId = userCurrentPackage?.package_id || 0;
    const userPackagePrice = userCurrentPackage?.package_price || 0;
    const priceDifference = Math.max(packageData.package_price - userPackagePrice, 0);



    const handleProceed = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        setIsProcessing(true);
        setShowPopup(false);

        if (paymentMethod === "wallet") {
            const walletBalance = await FetchWallet(userId);
            if (walletBalance.balance < priceDifference) {
                setShowInsufficientPopup(true);
                setIsProcessing(false);
                return;
            }
    
            const success = await deductWalletBalance(userId, priceDifference);
            if (success) {
                await upgradePackage(userId, package_id);
                alert("Payment successful! Plan upgraded.");
            } else {
                alert("Failed to deduct amount. Try again!");
            }
        } else if (paymentMethod === "money") {
            handleRazorpayPayment(priceDifference);
        }

        setIsProcessing(false);
    };

    const handleRazorpayPayment = async (priceDifference) => {
        const orderData = await createOrder(priceDifference); // API call to get order ID from backend
        if (!orderData) {
            alert("Failed to create Razorpay order. Try again.");
            return;
        }
    
        const options = {
            key: "rzp_test_D0wbfHHAyV89wY", // Replace with your Razorpay Key ID
            amount: priceDifference * 100, // Convert to paisa (INR subunit)
            currency: "INR",
            name: "Read Gro",
            description: "Payment for Upgrade",
            order_id: orderData.order.id, // Order ID from backend
            handler: async function (response) {
                // Validate Payment after receiving response
                const validationResponse = await validatePayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });
    
                if (validationResponse.success) {
                    alert("Payment Verified! Upgrading Plan...");
                    await upgradePackage(userId, package_id); // Upgrade plan only after successful validation
                } else {
                    alert("Payment verification failed! Please try again.");
                }
            },
            prefill: {
                name: user?.name || "Gnaneswar",
                email: user?.email || "bunnyroyals24@gmail.com",
                contact: user?.phone || "6304586548",
            },
            theme: {
                color: "#3399cc",
            },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    

    
    // Function to upgrade the user's package
    const upgradePackage = async (userId, newPackageId) => {
        try {
            const response = await fetch(`http://localhost:5000/upgrade_package`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, package_id: newPackageId }),
            });
    
            const data = await response.json();
            console.log(data.message);
            if (response.ok) {
                alert("Package upgraded successfully!");
                setUserPackageId(newPackageId); // Trigger a re-render
            } else {
                console.error("Failed to upgrade package:", data);
            }
        } catch (error) {
            console.error("upgradePackage error:", error);
        }
    };
    
    
    
    const headerColors = ["bg-red-600", "bg-blue", "bg-green-600", "bg-purple-600", "bg-yellow-500"];
    const headerColor = headerColors[package_id % headerColors.length];

    return (
        <div className="w-80 bg-white rounded-lg shadow-md overflow-hidden border flex flex-col mb-4">
           {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" /> */}

            <div className={`${headerColor} h-20 flex items-center justify-center relative`}>
                <img
                    src={`http://localhost:5000/uploads/${packageData.package_image}`}
                    alt="Package Logo"
                    className="w-20 h-20 rounded-full absolute top-10 border-4 border-white"
                />
            </div>
            <div className="flex-grow flex flex-col justify-between p-6 pt-14 text-center">
                <h3 className="text-xl font-semibold">{packageData.package_name.toUpperCase()}</h3>
                <div className="mt-4 text-left flex-grow">
                    {package_id > 1 && (
                        <p className="text-gray-600 font-medium mb-2">✅ Free {previousPackageName} Courses</p>
                    )}
                    {courses.map((course, index) => (
                        <p key={index} className="text-gray-800 flex items-center">✅ {course.name}</p>
                    ))}
                    {totalCourses > 3 && (
                        <p className="text-gray-600">+ {totalCourses - 3} more courses</p>
                    )}
                </div>
            </div>
            <hr className="border-gray-300 mt-auto" />
            <div className="p-4">
                {package_id <= userPackageId ? (
                    <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md">
                        Active Plan ✅
                    </button>
                ) : (
                    <button
                        className="w-full bg-blue text-white font-semibold py-2 rounded-md hover:bg-light-blue transition"
                        onClick={() => setShowPopup(true)}
                    >
                        Upgrade for ₹{priceDifference}
                    </button>
                )}
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                        <select 
                            value={paymentMethod} 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="border p-2 w-full mb-4"
                        >
                            <option value="">Select Payment Method</option>
                            <option value="wallet">Pay with Wallet</option>
                            <option value="money">Pay with Money</option>
                        </select>
                        <button 
                            onClick={handleProceed} 
                            disabled={isProcessing}
                            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
                        >
                            {isProcessing ? "Processing..." : "Proceed"}
                        </button>
                        <button 
                            onClick={() => setShowPopup(false)}
                            className="w-full bg-gray-400 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showInsufficientPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Insufficient Balance</h3>
            <p className="text-gray-700 mb-4">Your wallet balance is not enough to upgrade. Please add funds or use another payment method.</p>
            <button 
    onClick={() => setShowInsufficientPopup(false)}
    className="w-1/3 bg-gray-400 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-500 transition mx-auto block"
>
    Close
</button>

        </div>
    </div>
)}
        </div>
    );
};

export default PlanCard;