"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const CheckoutWeb = ({ packageId }) => {
  const router = useRouter();
  const { cartProducts: products } = useCartContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    password: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState({});
  const [packageDetails, setPackageDetails] = useState(null);

  // Fetch package details when packageId is available
  useEffect(() => {
    if (packageId) {
      fetch(`http://localhost:5000/getpackage/${packageId}`)
        .then((res) => res.json())
        .then((data) => setPackageDetails(data))
        .catch((err) => console.error("Error fetching package:", err));
    }
  }, [packageId]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button
  const handleNext = () => {
    if (validateForm()) {
      router.push("/payment"); // Navigate to the next page
    }
  };

  return (
    <section>
      <div className="container py-50px lg:py-60px 2xl:py-20 3xl:py-100px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-30px">
          {/* Left Section */}
          <div>
            <h4 className="text-xl font-bold pb-10px mb-5 border-b">Billing Details</h4>
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
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                  {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Address*</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Pincode*</label>
                  <input
                    type="number"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Set Password*</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
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
                    <td className="p-10px md:p-15px">Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-10px md:p-15px">{packageDetails?.package_name || "Loading..."}</td>
                    <td className="p-10px md:p-15px">₹{packageDetails?.package_price || "0.00"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Next Button (Now placed after Order Summary) */}
            <div className="flex justify-end mt-5">
  <ButtonPrimary
    onClick={handleNext}
    type="submit"
    width="full"
    className="px-5 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 w-3/4 lg:w-[300px]"
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
