import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const CourseView = ({ course }) => {
  const router = useRouter();

  return (
    <div
      className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl m-4"
      onClick={() => router.push(`./user-enrolled-courses/${course.id}`)}
    >
      {" "}
      {console.log(course)}
      {/* Course Image */}
      {course.image && (
        <img
          src={`http://localhost:5000/uploads/${course.image}`}
          alt={course.course_name}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      {/* Course Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold uppercase">{course.name}</h3>
        <p className="text-gray-600 text-sm uppercase">
          By {course.instructor}
        </p>

        {/* Star Ratings */}
        {/* <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                        <FaStar key={index} size={18} className="text-orange-500" fill="orange" />
                    ))}
                </div> */}
      </div>
      <button
        className="mt-4 w-full bg-pink-300 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300"
        onClick={() => router.push(`./user-enrolled-courses/${course.id}`)}
      >
        Learn 📖
      </button>
    </div>
  );
};

export default CourseView;
