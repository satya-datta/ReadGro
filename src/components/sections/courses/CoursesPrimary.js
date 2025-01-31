"use client";
import { useSearchParams } from "next/navigation";
import TabButtonSecondary from "@/components/shared/buttons/TabButtonSecondary";
import CoursesGrid from "@/components/shared/courses/CoursesGrid";
import CoursesList from "@/components/shared/courses/CoursesList";
import Pagination from "@/components/shared/others/Pagination";
import TabContentWrapper from "@/components/shared/wrappers/TabContentWrapper";
import useTab from "@/hooks/useTab";
import { useEffect, useRef, useState } from "react";
import getAllCourses from "@/libs/getAllCourses";
import Image from "next/image";
import Link from "next/link";
import NoData from "@/components/shared/others/NoData";
const sortInputs = [
  "Sort by New",
  "Title Ascending",
  "Title Descending",
  "Price Ascending",
  "Price Descending",
];
const coursesBeforeFilter = getAllCourses();

// get all filtered courses
const getAllFilteredCourses = (filterableCourses, filterObject) => {
  const { currentCategories, currentTags, currentSkillLevel } = filterObject;
  const filteredCourses = filterableCourses?.filter(
    ({ categories, tag, skillLevel }) =>
      (!currentCategories?.length || currentCategories.includes(categories)) &&
      (!currentTags?.length || currentTags?.includes(tag)) &&
      (!currentSkillLevel?.length ||
        currentSkillLevel?.includes("All") ||
        currentSkillLevel?.includes(skillLevel))
  );
  return filteredCourses;
};
// get sorted courses
const getSortedCourses = (courses, sortInput) => {
  switch (sortInput) {
    case "Sort by New":
      return courses?.sort((a, b) => a?.date - b?.date);
    case "Title Ascending":
      return courses?.sort((a, b) => a?.title?.localeCompare(b?.title));
    case "Title Descending":
      return courses?.sort((a, b) => b?.title?.localeCompare(a?.title));
    case "Price Ascending":
      return courses?.sort((a, b) => a?.price - b?.price);
    case "Price Descending":
      return courses?.sort((a, b) => b?.price - a?.price);
  }
};
const CoursesPrimary = ({ isNotSidebar, isList, card }) => {
  const category = useSearchParams().get("category");
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentSkillLevel, setCurrentSkillLevel] = useState([]);
  const [sortInput, setSortInput] = useState("Sort by New");
  const [isSearch, setIsSearch] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchCourses, setSearchCourses] = useState([]);
  const { currentIdx, setCurrentIdx, handleTabClick } = useTab();
  const [currentCourses, setCurrentCourses] = useState(null);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBlock, setIsBlog] = useState(false);
  const coursesRef = useRef(null);
  const serarchTimeoutRef = useRef(null);
  const filterObject = {
    currentCategories,
    currentTags,
    currentSkillLevel,
  };
  const coursesOnCategory = coursesBeforeFilter?.filter(({ categories }) =>
    categories.toLocaleLowerCase()?.includes(category?.split("_")?.join(" "))
  );
  console.log(category);
  const allFilteredCourses = category
    ? getAllFilteredCourses(coursesOnCategory, filterObject)
    : getAllFilteredCourses(coursesBeforeFilter, filterObject);
  const courses = category
    ? getSortedCourses(isSearch ? searchCourses : allFilteredCourses, sortInput)
    : getSortedCourses(
        isSearch ? searchCourses : allFilteredCourses,
        sortInput
      );
  const coursesString = JSON.stringify(courses);
  const totalCourses = courses?.length;
  const limit = 12;
  const totalPages = Math.ceil(totalCourses / limit);
  const paginationItems = [...Array(totalPages)];
  const handlePagesnation = (id) => {
    coursesRef.current.scrollIntoView({ behavior: "smooth" });
    if (typeof id === "number") {
      setCurrentPage(id);
      setSkip(limit * id);
    } else if (id === "prev") {
      setCurrentPage(currentPage - 1);
      setSkip(skip - limit);
    } else if (id === "next") {
      setCurrentPage(currentPage + 1);
      setSkip(skip + limit);
    }
    // const currentButton = e?.target;
  };
  const tapButtons = [
    {
      name: <i className="icofont-layout"></i>,
      content: (
        <CoursesGrid isNotSidebar={isNotSidebar} courses={currentCourses} />
      ),
    },
    {
      name: <i className="icofont-listine-dots"></i>,
      content: (
        <CoursesList
          isNotSidebar={isNotSidebar}
          isList={isList}
          courses={currentCourses}
          card={card}
        />
      ),
    },
  ];
  useEffect(() => {
    const courses = JSON.parse(coursesString);

    const coursesToShow = [...courses].splice(skip, limit);
    setCurrentCourses(coursesToShow);
  }, [skip, limit, coursesString]);

  useEffect(() => {
    if (isList) {
      setCurrentIdx(1);
    }
  }, [isList, setCurrentIdx]);
  // handle filters
  const getCurrentFilterInputs = (input, ps) => {
    return input === "All" && !ps.includes("All")
      ? ["All"]
      : ![...ps]?.includes(input)
      ? [...ps.filter((pInput) => pInput !== "All"), input]
      : [...ps?.filter((pInput) => pInput !== input && pInput !== "All")];
  };
  const handleFilters = (name, input) => {
    setIsSearch(false);
    setSearchString("");
    switch (name) {
      case "Categories":
        return setCurrentCategories((ps) => getCurrentFilterInputs(input, ps));
      case "Tag":
        return setCurrentTags((ps) => getCurrentFilterInputs(input, ps));
      case "Skill Level":
        return setCurrentSkillLevel((ps) => getCurrentFilterInputs(input, ps));
    }
  };
  // handle serachProducts
  const handleSearchProducts = (e) => {
    setIsBlog(true);
    setCurrentCategories([]);
    setCurrentTags([]);
    setCurrentSkillLevel([]);
    const value = e.target.value;
    setSearchString(value.toLowerCase());
  };
  // start search
  const startSearch = () => {
    serarchTimeoutRef.current = setTimeout(() => {
      const searchText = new RegExp(searchString, "i");
      let searchCourses;
      if (searchString) {
        setIsBlog(true);

        searchCourses = coursesBeforeFilter?.filter(({ title }) =>
          searchText.test(title)
        );
      } else {
        searchCourses = [];
      }

      setSearchCourses(searchCourses);
    }, 200);
  };

  return (
    <div>
      <div
        className="container tab py-10 md:py-50px lg:py-60px 2xl:py-100px"
        ref={coursesRef}
      >
        {/* courses header  */}
        <div
          className="courses-header flex justify-between items-center flex-wrap px-13px py-5px border border-borderColor dark:border-borderColor-dark mb-30px gap-y-5"
          data-aos="fade-up"
        >
         
          <div className="flex items-center">
            <div className="tab-links transition-all duraton-300 text-contentColor dark:text-contentColor-dark flex gap-11px">
              {tapButtons?.map(({ name, content }, idx) => (
                <TabButtonSecondary
                  key={idx}
                  name={name}
                  button={"icon"}
                  currentIdx={currentIdx}
                  handleTabClick={handleTabClick}
                  idx={idx}
                />
              ))}
            </div>
          
          </div>
        </div>

         <div
            className={`${
              isNotSidebar || category
                ? ""
                : "md:col-start-5 md:col-span-8 lg:col-start-4 lg:col-span-9"
            } space-y-[30px]`}
          >
            {currentCourses ? (
              <>
                <div className="tab-contents">
                  {tapButtons?.map(({ content }, idx) => (
                    <TabContentWrapper
                      key={idx}
                      isShow={idx === currentIdx ? true : false}
                    >
                      {content}
                    </TabContentWrapper>
                  ))}
                </div>

               
                {totalCourses > 11 ? (
                  <Pagination
                    pages={paginationItems}
                    totalItems={totalCourses}
                    handlePagesnation={handlePagesnation}
                    currentPage={currentPage}
                    skip={skip}
                    limit={limit}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              <NoData message={"No Course"} />
            )}
          </div> 
        </div>
      </div>
   
  );
};

export default CoursesPrimary;
