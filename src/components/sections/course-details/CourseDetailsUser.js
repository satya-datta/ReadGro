"use client";

import { useEffect, useState } from "react";
import CurriculumContent from "@/components/shared/course-details/CurriculumContent";

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
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <CurriculumContent id={course.course.id} />
          </div>
        </div>

        {/* Instructor Section */}
      </div>
    </section>
  );
};

export default CourseDetailsUser;
