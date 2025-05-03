"use client";

import { useEffect, useState } from "react";
import CurriculumContent from "@/components/shared/course-details/CurriculumContent";
let cid = 0;
const CourseDetailsUser = ({ id, type }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://readgro-backend.onrender.com/getspecific_course/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCourse(data);
            console.log(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching course details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <section>
      <div className="container mx-auto max-w-[800px] py-10 md:py-[50px] lg:py-[60px] 2xl:py-[100px]">
        <div className=" grid-cols-1 lg:grid-cols-12 gap-30px">
          <div className=" lg:col-span-8 space-y-[35px]">
            <div data-aos="fade-up">
              {/* course content  */}
              <div>
                {type === 2 || type === 3 ? (
                  ""
                ) : (
                  <>
                    {/* titile  */}
                    <h4
                      className="text-size-32 md:text-4xl font-bold text-blackColor dark:text-blackColor-dark mb-15px leading-43px md:leading-14.5 uppercase"
                      data-aos="fade-up"
                    >
                      {course.course.name || "Making Music with Other People"}
                    </h4>
                    {/* price and rating  */}

                    <p
                      className="text-sm md:text-lg text-contentColor dark:contentColor-dark mb-25px !leading-30px uppercase"
                      data-aos="fade-up"
                    >
                      {course.course.description}
                    </p>
                    {/* details  */}
                    <h6
                      className="text-sm md:text-lg text-contentColor dark:contentColor-dark mb-25px !leading-30px uppercase"
                      data-aos="fade-up"
                    >
                      By {course.course.instructor}
                    </h6>
                  </>
                )}
                {/* course tab  */}
                {/* <CourseDetailsTab id={cid} type={type} />
                 */}
                <CurriculumContent id={course.course.id} />
                {/* tag and share   */}
              </div>
            </div>
          </div>
          {/* course sidebar  */}
          <div
            className={`lg:col-start-9 lg:col-span-4 ${
              type === 2 || type === 3 ? "relative lg:top-[-340px]" : ""
            }`}
          >
            {/* <CourseDetailsSidebar type={type} course={course} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsUser;
