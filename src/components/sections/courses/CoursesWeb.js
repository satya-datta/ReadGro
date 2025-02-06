"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Star } from "lucide-react"; // Icons
import { FaStar } from "react-icons/fa"; // Import FontAwesome Star icon


const CoursesWeb = () => {
  const [courses, setCourses] = useState([]);
  const [topicsCount, setTopicsCount] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/getallcourses")
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
    fetch(`http://localhost:5000/gettopics/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.topics)) {
          setTopicsCount((prevCounts) => ({
            ...prevCounts,
            [courseId]: data.topics.length,
          }));
        } else {
          console.error(`Topics data for course ${courseId} is not an array`, data);
        }
      })
      .catch((error) => console.error(`Error fetching topics for course ${courseId}:`, error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 Explore Our Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => router.push(`courses/${course.course_id}`)}
            >
              {/* Category Label */}
              {course.course_id && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 text-xs rounded">
                  {course.course_id}
                </span>
              )}

              {/* Course Image */}
              {course.course_image && (
                <img
                  src={`http://localhost:5000/uploads/${course.course_image}`}
                  alt={course.course_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {/* Course Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{course.course_name}</h3>
                <p className="text-gray-600 text-sm">By {course.instructor}</p>

                {/* Star Ratings */}
                <div className="flex items-center mt-2">
  {[...Array(5)].map((_, index) => (
    <FaStar key={index} size={18} className="text-orange-500" fill="orange" />
  ))}
  {/* <span className="text-gray-500 ml-2 text-sm">(44)</span> */}
   {/* Number of ratings */}
</div>

                {/* Lessons Count */}
                <div className="flex items-center text-gray-600 text-sm mt-3">
                  <BookOpen size={18} className="text-blue-500 mr-2" />
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
