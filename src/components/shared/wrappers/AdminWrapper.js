const AdminWrapper = ({ children }) => {
  return (
    <AdminContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <div className="min-h-screen flex flex-col justify-between">
            {/* Main content with top margin */}
            <main className="flex-grow mt-20">{children}</main>

            {/* Footer always at bottom */}
            <DashboardFooter />

            {/* Scroll up button */}
            <Scrollup />
          </div>
        </WishlistContextProvider>
      </CartContextProvider>
    </AdminContextProvider>
  );
};

export default AdminWrapper;
