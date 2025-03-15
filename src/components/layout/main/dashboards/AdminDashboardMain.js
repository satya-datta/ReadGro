import AdminFeedbacks from "@/components/sections/sub-section/dashboards/AdminFeedbacks";
import CounterAdmin from "@/components/sections/sub-section/dashboards/CounterAdmin";
import NoticeBoard from "@/components/sections/sub-section/dashboards/NoticeBoard";
import Notifications from "@/components/sections/sub-section/dashboards/Notifications";
import PopularInstructors from "@/components/sections/sub-section/dashboards/PopularInstructors";
import RecentCourses from "@/components/sections/sub-section/dashboards/RecentCourses";
import ChartDashboard from "@/components/shared/dashboards/ChartDashboard";

const AdminDashboardMain = () => {
  return (
    <>
      <CounterAdmin />
      {/* <ChartDashboard />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-30px">
     
        <PopularInstructors />
       
        <RecentCourses />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-30px">
    
        <NoticeBoard />
    
        <Notifications />
      </div> */}
      {/* <AdminFeedbacks /> */}
    </>
  );
};

export default AdminDashboardMain;
