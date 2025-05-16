"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Star, Clock, Users, BarChart2 } from "lucide-react";

const CoursesWeb = () => {
  const [courses, setCourses] = useState([]);
  const [topicsCount, setTopicsCount] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("https://readgro-backend.onrender.com/getallcourses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.courses)) {
          setCourses(data.courses);
          data.courses.forEach((course) => {
            fetchTopicsCount(course.course_id);
          });
        } else {
          console.error("Courses data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const fetchTopicsCount = (courseId) => {
    fetch(`https://readgro-backend.onrender.com/gettopics/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.topics)) {
          setTopicsCount((prevCounts) => ({
            ...prevCounts,
            [courseId]: data.topics.length,
          }));
        } else {
          console.error(
            `Topics data for course ${courseId} is not an array`,
            data
          );
        }
      })
      .catch((error) =>
        console.error(`Error fetching topics for course ${courseId}:`, error)
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Our Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`courses/${course.course_id}`)}
            >
              {/* Course Image with Badge */}
              <div className="relative">
                {course.course_image && (
                  <img
                    src={`${course.course_image}`}
                    alt={course.course_name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category || "New"}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {course.course_name}
                  </h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description ||
                    "Comprehensive course covering all aspects of the subject."}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                    {course.instructor.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-sm text-gray-700">
                    {course.instructor}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                  <div className="flex flex-col items-center">
                    <BookOpen className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-xs text-gray-600">
                      {topicsCount[course.course_id] || 0} Lessons
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-purple-500 mb-1" />
                    <span className="text-xs text-gray-600">12 Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-green-500 mb-1" />
                    <span className="text-xs text-gray-600">120 Students</span>
                  </div>
                </div>

                {/* Progress Bar (optional) */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-12">No Courses Available</p>
      )}
    </div>
  );
};

export default CoursesWeb;
