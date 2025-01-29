"use client";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AdmineditCourseMain = ({ course_id }) => {
  // State for course details
  const [course_name, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [course_description, setCourseDescription] = useState("");
  const [course_image, setCourseImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // State for dynamically added topics
  const [topics, setTopics] = useState([]);
  const [newTopics, setNewTopics] = useState([]); // Stores newly added topics
  const [deletedTopics, setDeletedTopics] = useState([]);

  // Fetch course details and topics on mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await fetch(`http://localhost:5000/getspecific_course/${course_id}`);
        const courseData = await courseResponse.json();

        const topicsResponse = await fetch(`http://localhost:5000/gettopics/${course_id}`);
        const topicsData = await topicsResponse.json();

        setTopics(Array.isArray(topicsData.topics) ? topicsData.topics : []);
        setCourseName(courseData.course.name || "");
        setInstructor(courseData.course.instructor || "");
        setCourseDescription(courseData.course.description || "");
        setExistingImage(courseData.course.image || "");
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [course_id]);

  // Store topics in localStorage
  useEffect(() => {
    localStorage.setItem("newTopics", JSON.stringify(newTopics));
    localStorage.setItem("deletedTopics", JSON.stringify(deletedTopics));
  }, [newTopics, deletedTopics]);

  const handleAddTopic = () => {
    setNewTopics([...newTopics, { topic_name: "", video_url: "" }]);
  };

  const handleDeleteTopic = (index) => {
    if (index < topics.length) {
      setDeletedTopics([...deletedTopics, topics[index].topic_id]);
      setTopics(topics.filter((_, i) => i !== index));
    } else {
      setNewTopics(newTopics.filter((_, i) => i !== (index - topics.length)));
    }
  };

  const handleTopicChange = (index, field, value) => {
    if (index < topics.length) {
      const updatedTopics = [...topics];
      updatedTopics[index][field] = value;
      setTopics(updatedTopics);
    } else {
      const updatedNewTopics = [...newTopics];
      updatedNewTopics[index - topics.length][field] = value;
      setNewTopics(updatedNewTopics);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = {
      course_name,
      instructor,
      course_description,
      topics: [...topics, ...newTopics].map(({ topic_name, video_url }) => ({ topic_name, video_url })),
    };
    
    try {
      await fetch(`http://localhost:5000/updatecoursedetails/${course_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      for (const topic of newTopics) {
        await fetch("http://localhost:5000/create-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...topic, course_id }),
        });
      }

      for (const topicId of deletedTopics) {
        await fetch(`http://localhost:5000/delete-topic/${topicId}`, { method: "DELETE" });
      }
      
      setNewTopics([]);
      setDeletedTopics([]);
      localStorage.removeItem("newTopics");
      localStorage.removeItem("deletedTopics");
      alert("Course and topics updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">Edit Course</h2>
      </div>
   
      <form onSubmit={handleSubmit} className="text-sm text-blackColor dark:text-blackColor-dark leading-1.8">
        {/* Course Details */}
        <div className="grid grid-cols-1 mb-15px gap-y-15px gap-x-30px">
          <div>
            <label className="mb-3 block font-semibold">Course Name</label>
            <input
              type="text"
              value={course_name}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-3 block font-semibold">Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Description</label>
          <textarea
            value={course_description}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full py-10px px-5 text-sm focus:outline-none"
            rows={5}
          />
        </div>

        {/* Course Image */}
        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Course Image</label>
          {existingImage && <img src={existingImage} alt="Course" className="w-32 h-32 mb-2" />}
          <input type="file" className="w-full py-10px px-5 text-sm focus:outline-none" />
        </div>

        {/* Topics Section */}
        <div>
          <label className="mb-3 block font-semibold">Topics</label>
          {[...topics, ...newTopics].map((topic, index) => (
            <div key={index} className="flex items-center mb-3 gap-3">
              <input
                type="text"
                value={topic.topic_name || ""}
                onChange={(e) => handleTopicChange(index, "topic_name", e.target.value)}
                className="flex-1 py-2 px-3 text-sm focus:outline-none border border-gray-300 rounded"
              />
              <input
                type="text"
                value={topic.video_url || ""}
                onChange={(e) => handleTopicChange(index, "video_url", e.target.value)}
                className="flex-1 py-2 px-3 text-sm focus:outline-none border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteTopic(index)}
                className="text-white bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTopic}
            className="mt-3 text-black bg-green-500 px-3 py-1 rounded"
          >
            Add Topic
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-15px">
          <ButtonPrimary type="submit">Update Course</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdmineditCourseMain;
