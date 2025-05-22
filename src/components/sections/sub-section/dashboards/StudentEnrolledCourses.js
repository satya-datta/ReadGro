"use client";
import { useEffect, useState, useContext } from "react";
import useTab from "@/hooks/useTab";
import TabContentWrapper from "@/components/shared/wrappers/TabContentWrapper";
import TabButtonSecondary from "@/components/shared/buttons/TabButtonSecondary";
import EnrolledContent from "@/components/shared/dashboards/EnrolledContent";
import ActiveContent from "@/components/shared/dashboards/ActiveContent";
import CompletedContent from "@/components/shared/dashboards/CompletedContent";
import { useUserContext } from "@/contexts/UserContext";
import Testloader from "@/components/shared/others/loader";
const StudentEnrolledCourses = () => {
  const { currentIdx, handleTabClick } = useTab();
  const { user } = useUserContext();
  const [packageId, setPackageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchPackageId = async () => {
      try {
        const res = await fetch(
          `https://readgro-backend.onrender.com/getuser_details/${user.userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch package details");

        const data = await res.json();
        console.log(data.user.packageId);
        setPackageId(data.user.packageId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageId();
  }, [user?.package_id]);

  const tabbuttons = [
    {
      name: "ENROLLED COURSES",
      content: loading ? (
        <div className="flex justify-center items-center min-h-[0px]">
          <Testloader />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <EnrolledContent package_id={packageId} />
      ),
    },
    // {
    //   name: "ACTIVE COURSES",
    //   content: <ActiveContent />,
    // },
    // {
    //   name: "COMPLETED COURSES",
    //   content: <CompletedContent />,
    // },
  ];

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {/* heading */}
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          Courses
        </h2>
      </div>
      <div className="tab">
        <div className="tab-links flex flex-wrap mb-10px lg:mb-50px rounded gap-10px">
          {tabbuttons.map(({ name }, idx) => (
            <TabButtonSecondary
              key={idx}
              name={name}
              idx={idx}
              currentIdx={currentIdx}
              handleTabClick={handleTabClick}
              button={"small"}
            />
          ))}
        </div>
        <div>
          {tabbuttons.map(({ content }, idx) => (
            <TabContentWrapper key={idx} isShow={idx === currentIdx}>
              <div className="grid grid-cols-1 sm:grid-cols-3   sm:mx-4 sm:px-6 sm:-mx-15px">
                {content}
              </div>
            </TabContentWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentEnrolledCourses;
