"use client";

import { useEffect, useState } from "react";

import CurriculumContentRestricted from "@/components/shared/course-details/CurriculamContentRestricted";
let cid = 0;
const CourseDetailsPrimary = ({ id, type }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/getspecific_course/${id}`)
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
            {/* course 1  */}
            <div data-aos="fade-up">
              {/* course thumbnail  */}
              {type === 2 || type === 3 ? (
                ""
              ) : (
                <div className="overflow-hidden relative mb-5">
                  <img
                    src={`http://localhost:5000/uploads/${course.course.image}`}
                    alt="Course Thumbnail"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              {/* course content  */}
              <div>
                {type === 2 || type === 3 ? (
                  ""
                ) : (
                  <>
                    <div
                      className="flex items-center justify-between flex-wrap gap-6 mb-30px"
                      data-aos="fade-up"
                    >
                      {/* <div>
                        <p className="text-sm text-contentColor dark:text-contentColor-dark font-medium">
                          Created Time:{" "}
                          <span className="text-blackColor dark:text-blackColor-dark">
                           {course.course.created_time}
                          </span>
                        </p>
                      </div> */}
                    </div>

                    {/* titile  */}
                    <h4
                      className="text-size-32 md:text-4xl font-bold text-blackColor dark:text-blackColor-dark mb-15px leading-43px md:leading-14.5"
                      data-aos="fade-up"
                    >
                      {course.course.name || "Making Music with Other People"}
                    </h4>
                    {/* price and rating  */}
                    <div
                      className="flex gap-5 flex-wrap items-center mb-30px"
                      data-aos="fade-up"
                    >
                      <div className="text-start md:text-end">
                        <i className="icofont-star text-size-15 text-green"></i>{" "}
                        <i className="icofont-star text-size-15 text-green"></i>{" "}
                        <i className="icofont-star text-size-15 text-green"></i>{" "}
                        <i className="icofont-star text-size-15 text-green"></i>
                        <i className="icofont-star text-size-15 text-green"></i>{" "}
                        <span className=" text-blackColor dark:text-blackColor-dark">
                          (44)
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-sm md:text-lg text-contentColor dark:contentColor-dark mb-25px !leading-30px"
                      data-aos="fade-up"
                    >
                      {course.course.description}
                    </p>
                    {/* details  */}
                    <h6
                      className="text-sm md:text-lg text-contentColor dark:contentColor-dark mb-25px !leading-30px"
                      data-aos="fade-up"
                    >
                      By {course.course.instructor}
                    </h6>
                  </>
                )}
                {/* course tab  */}
                {/* <CourseDetailsTab id={cid} type={type} />
                 */}
                <CurriculumContentRestricted id={course.course.id} />
                {/* tag and share   */}
              </div>
            </div>
          </div>
          {/* course sidebar  */}
          <div
            className={`lg:col-start-9 lg:col-span-4 ${
              type === 2 || type === 3 ? "relative lg:top-[-340px]" : ""
            }`}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPrimary;
