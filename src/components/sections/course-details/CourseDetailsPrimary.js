"use client";

import { useEffect, useState } from "react";
import CurriculumContentRestricted from "@/components/shared/course-details/CurriculamContentRestricted";

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
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching course details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (!course)
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Course not found
        </h3>
        <p className="text-gray-600 mt-2">
          The requested course could not be loaded.
        </p>
      </div>
    );

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-16">
        {/* Course Header Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {type !== 2 && type !== 3 && (
            <div className="relative h-64 md:h-80 lg:h-96">
              <img
                src={`http://localhost:5000/uploads/${course.course.image}`}
                alt="Course Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {course.course.category || "AI & Technology"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.course.duration || "10+ hours"}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {course.course.name || "The Complete AI Guide"}
                </h1>

                <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                  {course.course.description ||
                    "50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering"}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">(44 reviews)</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Last updated: {course.course.created_time || "June 2023"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-700 font-medium">
                        {course.course.instructor?.charAt(0) || "S"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium text-gray-800">
                        {course.course.instructor || "Satya Nanda"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {type !== 2 && type !== 3 && (
                <div className="md:w-80 shrink-0">
                  <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                    <button className="w-full bg-primaryColor hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4">
                      Enroll Now
                    </button>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                        <span>Downloadable resources</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Course Curriculum
            </h2>
            <CurriculumContentRestricted id={course.course.id} />
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About the Instructor
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <span className="text-3xl text-gray-700 font-medium">
                  {course.course.instructor?.charAt(0) || "S"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.course.instructor || "Satya Nanda"}
                </h3>
                <p className="text-gray-600 mb-4">
                  AI Expert with 10+ years of experience in machine learning and
                  generative AI. Former lead engineer at major tech companies
                  and passionate educator.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>25,000+ students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span>15 courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPrimary;
