import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Scrollup from "../others/Scrollup";
import CartContextProvider from "@/contexts/CartContext";
import WishlistContextProvider from "@/contexts/WshlistContext";
import UserContextProvider from "@/contexts/UserContext"; // Import UserContextProvider
import DashboardFooter from "@/components/layout/footer/DashboardFooter";

const PlainWrapper = ({ children }) => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <div style={{ marginTop: "80px" }}>{children}</div>{" "}
          {/* Add margin-top */}
        </WishlistContextProvider>
      </CartContextProvider>

      {/* footer */}
      <DashboardFooter />
      {/* scroll up */}
      <Scrollup />
    </UserContextProvider>
  );
};

export default PlainWrapper;
