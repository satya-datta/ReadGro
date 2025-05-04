import SidebarDashboard from "../dashboards/SidebarDashboard";

const DashboardContainer = ({ children }) => {
  return (
    <section className="w-full pt-20 pb-8   px-4 md:px-8 ">
      <div className="grid grid-cols-1  lg:grid-cols-12 gap-30px min-h-screen">
        {/* Sidebar */}
        <SidebarDashboard />

        {/* Main Dashboard Content */}
        <div className="lg:col-span-9 col-span-1 w-full">{children}</div>
      </div>
    </section>
  );
};

export default DashboardContainer;
