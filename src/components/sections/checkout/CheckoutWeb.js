"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";

import { useUserContext } from "@/contexts/UserContext";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Cookies from "js-cookie"; // Import the cookies library
import { Eye, EyeOff } from "lucide-react"; // Import icons
import { createOrder, validatePayment } from "@/libs/PaymentOrder";

const CheckoutWeb = ({ packagename }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUserContext();
  const userId = user?.userId;

  const package_name = packagename;
  const router = useRouter();
  const { cartProducts: products } = useCartContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Address: "",
    Pincode: "",
    password: "",
    referralCode: Cookies.get("referralCode") || "",
  });

  const [errors, setErrors] = useState({});
  const [packageDetails, setPackageDetails] = useState(null);
  const [isReferralValid, setIsReferralValid] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(
    packageDetails?.discount_price
  ); // Default price

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // Fetch package details when packagename is available
  useEffect(() => {
    if (packagename) {
      fetch(`http://localhost:5000/getpackagebyname/${package_name}`)
        .then((res) => res.json())
        .then((data) => setPackageDetails(data))
        .catch((err) => console.error("Error fetching package:", err));
    }
  }, [packagename]);
  const validateReferralCode = async (referralCode) => {
    if (!referralCode) {
      setDiscountedPrice(packageDetails?.package_price); // Reset to original price if referral is empty
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/validate_refferalcode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode }),
        }
      );

      const data = await response.json();

      if (data.valid) {
        setDiscountedPrice(
          packageDetails?.discount_price || packageDetails?.package_price
        ); // Apply discount
      } else {
        setDiscountedPrice(packageDetails?.package_price); // No discount
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      setDiscountedPrice(packageDetails?.package_price); // Default price on error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "referralCode") {
      validateReferralCode(e.target.value);
    }
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (
      !formData.email.trim() ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    )
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.Address.trim()) newErrors.Address = "Address is required";
    if (!formData.Pincode.trim() || !/^\d{6}$/.test(formData.Pincode))
      newErrors.Pincode = "Enter a valid 6-digit Pincode";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button

  const handleNext = async () => {
    console.log("Processing checkout...");
    console.log(userId);
    if (!validateForm()) return;

    try {
      // Step 1: Validate user
      const validateResponse = await fetch(
        "http://localhost:5000/validate_user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      const validateResult = await validateResponse.json();
      if (!validateResult.verified) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateResult.message.includes("Email")
            ? validateResult.message
            : "",
          phone: validateResult.message.includes("Phone")
            ? validateResult.message
            : "",
        }));
        return;
      }

      console.log("User validated. Initiating payment...");

      // Step 2: Process Payment
      const paymentSuccess = await handleRazorpayPayment(
        packageDetails?.package_price
      );
      if (!paymentSuccess) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "Payment failed. Please try again.",
        }));
        return;
      }

      console.log("Payment successful. Registering user...");

      // Step 3: Register the User
      const registerResponse = await fetch(
        "http://localhost:5000/create-user",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            package_id: packageDetails?.package_id,
          }),
        }
      );

      const registerResult = await registerResponse.json();
      if (registerResult.success) {
        router.push("/user/user-dashboard");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: registerResult.message || "User registration failed.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        api: "Something went wrong. Please try again later.",
      }));
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const priceToPay = discountedPrice || packageDetails?.package_price; // Use discounted price if available

      const orderData = await createOrder(priceToPay); // API call to get order ID from backend
      if (!orderData) {
        alert("Failed to create Razorpay order. Try again.");
        return false; // Return failure
      }

      return new Promise((resolve) => {
        const options = {
          key: "rzp_test_D0wbfHHAyV89wY", // Replace with your Razorpay Key ID
          amount: priceToPay * 100, // Convert to paisa (INR subunit)
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
              alert("Payment Verified!");
              resolve(true); // Payment successful
            } else {
              alert("Payment verification failed! Please try again.");
              resolve(false); // Payment failed
            }
          },
          prefill: {
            name: formData.name || "User",
            email: formData.email || "user@example.com",
            contact: formData.phone || "0000000000",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (error) {
      console.error("Error in payment:", error);
      return false; // Return failure if there's an error
    }
  };

  return (
    <section>
      <div className="container py-50px lg:py-60px 2xl:py-20 3xl:py-100px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-30px">
          {/* Left Section */}
          <div>
            <h4 className="text-xl font-bold pb-10px mb-5 border-b">
              Billing Details
            </h4>
            <form data-aos="fade-up">
              <div className="grid grid-cols-1 gap-y-5 mb-5">
                <div>
                  <label className="text-sm mb-5px block">Referral Code</label>
                  <input
                    type="text"
                    name="referralCode"
                    placeholder="Referral Code"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {isReferralValid === false && (
                    <p className="text-red-500">Invalid referral code</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Name*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Address*</label>
                  <input
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.Address && (
                    <p className="text-red-500">{errors.Address}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Pincode*</label>
                  <input
                    type="number"
                    name="Pincode"
                    placeholder="Pincode"
                    value={formData.Pincode}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.Pincode && (
                    <p className="text-red-500">{errors.Pincode}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="text-sm mb-2 block">Set Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-[50px] px-5 border placeholder-opacity-80 pr-10"
                    />
                    {/* Eye Icon for Toggle */}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="p-10px lg:p-35px">
            <h4 className="text-2xl font-bold mb-5">Your Order</h4>
            <div className="overflow-auto">
              <table className="table-fixed w-full border-t font-medium">
                <thead>
                  <tr className="border-b">
                    <td className="p-10px md:p-15px">Product</td>
                    <td className="p-10px md:p-15px">Actual Price</td>
                    <td className="p-10px md:p-15px">With Discount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-10px md:p-15px">
                      {packageDetails?.package_name || "Loading..."}
                    </td>
                    <td className="p-10px md:p-15px">
                      ₹{packageDetails?.package_price || "0.00"}
                      {/* Strike-through original price */}
                    </td>
                    <td className="p-10px md:p-15px font-bold text-green-600">
                      ₹
                      {discountedPrice ||
                        packageDetails?.package_price ||
                        "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Package Image (Below Product Details) */}
            {packageDetails?.package_image && (
              <div className="mt-5">
                <img
                  src={packageDetails.package_image}
                  alt={packageDetails?.package_name || "Package"}
                  className="w-full h-[400px] object-cover rounded-md border"
                />
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end mt-5">
              <ButtonPrimary
                onClick={handleNext}
                type="submit"
                width="full"
                className="px-5 py-3 bg-primaryColor text-white font-bold rounded hover:bg-primaryColor w-3/4 lg:w-[300px]"
              >
                Next
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutWeb;
