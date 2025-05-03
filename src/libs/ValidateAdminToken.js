const validateAdminToken = async () => {
  try {
    const response = await fetch(
      "https://readgro-backend.onrender.com/auth/validate",
      {
        method: "GET",
        credentials: "include", // ✅ send cookie
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { isValid: false, admin: null };
    }

    const data = await response.json();
    return { isValid: !!data.admin, admin: data.admin };
  } catch (error) {
    console.error("Admin token validation error:", error);
    return { isValid: false, admin: null };
  }
};

export default validateAdminToken;
