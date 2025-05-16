"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "../courses/CourseCard";
import CourseView from "../courses/CourseView";

const EnrolledContent = ({ package_id }) => {
  const [courseIds, setCourseIds] = useState([]); // Stores course IDs
  const [courses, setCourses] = useState([]); // Stores course details
  const router = useRouter();

  // Fetch course IDs mapped to the package
  useEffect(() => {
    fetch(
      `https://readgro-backend.onrender.com/getcoursemappings/${package_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ids = data.map((course) => course.course_id);
          setCourseIds(ids);
        } else {
          console.error(
            `Courses data for package ${package_id} is not an array`,
            data
          );
        }
      })
      .catch((error) =>
        console.error(
          `Error fetching courses for package ${package_id}:`,
          error
        )
      );
  }, [package_id]);

  // Fetch course details using the stored course IDs
  useEffect(() => {
    if (courseIds.length === 0) return;

    fetch("https://readgro-backend.onrender.com/getcoursedetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_ids: courseIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error("Courses details response is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [courseIds]);
  return courses?.map((course) => (
    <CourseView key={course.id} course={course} />
  ));
};

export default EnrolledContent;
