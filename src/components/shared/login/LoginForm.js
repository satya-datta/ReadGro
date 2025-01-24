import React, { useEffect, useState } from "react";

const LoginForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // State to control redirection

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await fetch("http://localhost:5000/authadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true); // User is authenticated
        setError(null); // Clear any existing errors
        setRedirecting(true); // Start redirection
      } else {
        setIsAuthenticated(false); // Not authenticated
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const checkAuth = async () => {
    console.log("Entering checkAuth...");
    try {
      const response = await fetch("http://localhost:5000/auth/validate", {
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();
      console.log("Validation response:", data);

      if (response.ok) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // Not authenticated
      }
    } catch (err) {
      console.error("Auth validation error:", err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication status on component mount
  }, []);

  // Handle redirection after successful login
  useEffect(() => {
    if (redirecting) {
      // Delay redirection to allow UI updates (e.g., seeing the data)
      const timer = setTimeout(() => {
        window.location.href = "/admin/Gnaneswar/admin-profile";
      }, 1500); // Adjust delay time as needed (1.5 seconds here)

      return () => clearTimeout(timer); // Clear timer on component unmount
    }
  }, [redirecting]);

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render login form if not authenticated
  return (
    <div className="opacity-100 transition-opacity duration-150 ease-linear">
      {/* Heading */}
      <div className="text-center">
        <h3 className="text-size-32 font-bold text-blackColor dark:text-blackColor-dark mb-2 leading-normal">
          Login
        </h3>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 text-red-500 text-center">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSignIn} className="pt-25px" data-aos="fade-up">
        <div className="mb-25px">
          <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
            Username or email
          </label>
          <input
            type="email"
            placeholder="Your username or email"
            className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-25px">
          <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-contentColor dark:text-contentColor-dark flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-18px h-18px mr-2 block box-content"
            />
            <label htmlFor="remember"> Remember me</label>
          </div>
        </div>

        <div className="my-25px text-center">
          <button
            type="submit"
            className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor hover:text-primaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-whiteColor dark:hover:bg-whiteColor-dark"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
