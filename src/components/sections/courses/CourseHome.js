"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const CourseHome = () => {
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
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
          640: { slidesPerView: 2, spaceBetween: 15 }, // Tablet
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Desktop (Max 3 cards)
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => router.push(`courses/${course.course_id}`)}
            >
              {course.course_image && (
                <img
                  src={`https://readgro-backend.onrender.com/uploads/${course.course_image}`}
                  alt={course.course_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">
                  {course.course_name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm">
                  BY {course.instructor.toUpperCase()}
                </p>
                <div className="flex items-center text-gray-600 text-sm mt-3">
                  <BookOpen size={18} className="text-yellow-500 mr-2" />
                  {topicsCount[course.course_id] !== undefined
                    ? `${topicsCount[course.course_id]} Lessons`
                    : "Loading lessons..."}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseHome;
