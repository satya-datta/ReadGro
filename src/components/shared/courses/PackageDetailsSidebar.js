import BlogContactForm from "../blogs/BlogContactForm";
import BlogSocials from "../blogs/BlogSocials";
import BlogTags from "../blogs/BlogTags";
import CourseEnroll from "../course-details/CourseEnroll";
import PopularCoursesMini from "../course-details/PopularCoursesMini";

const DetailsSidebar = ({ type, course }) => {
  return (
    <div className="flex flex-col">
      {/* enroll section  */}
      <CourseEnroll type={type} course={course} />

      {/* social area  */}
   

      {/* tags */}
      
    </div>
  );
};

export default DetailsSidebar;
