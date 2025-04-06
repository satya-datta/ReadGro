"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Star } from "lucide-react"; // Icons

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎓 Explore Our Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => router.push(`courses/${course.course_id}`)}
            >
              {/* Category Label */}

              {/* Course Image */}
              {course.course_image && (
                <img
                  src={`https://readgro-backend.onrender.com/uploads/${course.course_image}`}
                  alt={course.course_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {/* Course Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">
                  {course.course_name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm">
                  BY {course.instructor.toUpperCase()}
                </p>

                {/* Lessons Count */}
                <div className="flex items-center text-gray-600 text-sm mt-3">
                  <BookOpen size={18} className="text-green-500 mr-2" />
                  {topicsCount[course.course_id] !== undefined
                    ? `${topicsCount[course.course_id]} Lessons`
                    : "Loading lessons..."}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Courses Available</p>
      )}
    </div>
  );
};

export default CoursesWeb;
