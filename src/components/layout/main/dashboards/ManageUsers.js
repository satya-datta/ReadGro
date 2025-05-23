"use client";
import TabButtonSecondary from "@/components/shared/buttons/TabButtonPrimary";
import useTab from "@/hooks/useTab";
import WithDrawlRequest from "./RGAdminWithDrawlRequest";
import ProfileContent from "@/components/shared/dashboards/ProfileContent";
import PasswordContent from "@/components/shared/dashboards/PasswordContent";
import SocialIconContent from "@/components/shared/dashboards/SocialIconContent";
import TabContentWrapper from "@/components/shared/wrappers/TabContentWrapper";
import UserBankDetails from "./ADMINUserBankDetails";
const ManageUsers = ({ userId }) => {
  const { currentIdx, handleTabClick } = useTab();
  const tabbuttons = [
    // {
    //   name: "BANK DETAILS",
    //   content: <UserBankDetails userId={userId}/>,
    // },
    {
      name: "WITHDRAWL REQUEST",
      content: <WithDrawlRequest userId={userId} />,
    },
  ];
  console.log(userId);
  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {/* heading */}
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          My Profile
        </h2>
      </div>
      <div>
        <div className=" flex flex-wrap mb-10px lg:mb-50px rounded gap-10px">
          {tabbuttons?.map(({ name }, idx) => (
            <TabButtonSecondary
              key={idx}
              name={name}
              currentIdx={currentIdx}
              idx={idx}
              handleTabClick={handleTabClick}
              button={"small"}
            />
          ))}
        </div>
        <div>
          {tabbuttons?.map(({ content }, idx) => (
            <TabContentWrapper
              key={idx}
              isShow={currentIdx === idx ? true : false}
            >
              {content}
            </TabContentWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
