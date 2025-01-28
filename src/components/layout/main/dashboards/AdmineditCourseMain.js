"use client"
import React, { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AdmineditCourseMain = ({ course_id }) =>{
  // State for course info
  const [course_name, setcourse_name] = useState("");
  const [instructor, setinstructor] = useState("");
  const [course_description, setcourse_description] = useState("");
  const [course_image, setCourseImage] = useState(null);

  // State for dynamically added topics
  const [topics, setTopics] = useState([]);

  // State for form errors
  const [errors, setErrors] = useState({});

  // Add a new topic
  const handleAddTopic = () => {
    setTopics([...topics, { topicName: "", videoUrl: "" }]);
  };

  // Handle topic name change
  const handleTopicNameChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index].topicName = value;
    setTopics(updatedTopics);
  };

  // Handle video URL change
  const handleVideoUrlChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index].videoUrl = value;
    setTopics(updatedTopics);
  };

  // Delete a topic
  const handleDeleteTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCourseImage(event.target.files[0]);
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!course_name.trim()) newErrors.course_name = "Course name is required.";
    if (!instructor.trim()) newErrors.instructor = "Instructor name is required.";
    if (!course_description.trim()) newErrors.course_description = "Course description is required.";
    if (!course_image) newErrors.course_image = "Course image is required.";
    if (topics.some((topic) => !topic.topicName.trim() || !topic.videoUrl.trim())) {
      newErrors.topics = topics.map((topic, index) => {
        if (!topic.topicName.trim() || !topic.videoUrl.trim()) {
          return `Topic ${index + 1} must have both a name and a valid video URL.`;
        }
        return "";
      });
    }
    setErrors(newErrors); // Now setErrors is defined
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // Create a new FormData object for the course data
      const formData = new FormData();
      formData.append("course_name", course_name);
      formData.append("instructor", instructor);
      formData.append("course_description", course_description);
      // formData.append("created_time", new Date().toISOString());
      
      // Append the image to the formData
      if (course_image) {
        formData.append("course_image", course_image);
      }
  
      // Send the course data to the API (using FormData)
      const courseResponse = await fetch('http://localhost:5000/create-course', {
        method: 'POST',
        body: formData,
      });
  
      if (!courseResponse.ok) {
        console.error('Error creating course');
        return;
      }
  
      const courseResult = await courseResponse.json();
      console.log('Course created successfully:', courseResult);
      const course_id = courseResult.course_id; // Assuming the response includes the created course ID
  
      // Send each topic to the /create-topic API route
      for (const topic of topics) {
        const topicData = {
          topic_name: topic.topicName,
          video_url: topic.videoUrl,
          course_id, // Associate each topic with the created course
        };
  
        const topicResponse = await fetch('http://localhost:5000/create-topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(topicData),
        });
  
        if (!topicResponse.ok) {
          console.error('Error submitting topic:', topicData);
          continue;
        }
  
        console.log('Topic created successfully:', await topicResponse.json());
      }
  
      // Reset the form or show a success message
      setcourse_name("");
      setinstructor("");
      setcourse_description("");
      setCourseImage(null);
      setTopics([]);
      setErrors({});
      alert('Course and topics created successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {/* Heading */}
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">Add New Course</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="text-sm text-blackColor dark:text-blackColor-dark leading-1.8">
        <div className="grid grid-cols-1 mb-15px gap-y-15px gap-x-30px">
          <div>
            <label className="mb-3 block font-semibold">Course Name</label>
            <input
              type="text"
              value={course_name}
              onChange={(e) => setcourse_name(e.target.value)}
              placeholder="Enter course name"
              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
            />
          </div>
          <div>
            <label className="mb-3 block font-semibold">Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setinstructor(e.target.value)}
              placeholder="Enter instructor name"
              className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
            />
          </div>
        </div>

        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Description</label>
          <textarea
            value={course_description}
            onChange={(e) => setcourse_description(e.target.value)}
            className="w-full py-10px px-5 text-sm text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
            cols={30}
            rows={5}
            placeholder="Enter course description"
          />
        </div>

        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Course Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full py-10px px-5 text-sm text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
          />
        </div>
        

        {/* Dynamic Topics Section */}
        <div>
          <label className="mb-3 block font-semibold">Topics</label>
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <div key={index} className="flex items-center mb-3 gap-3">
                <input
                  type="text"
                  value={topic.topicName}
                  onChange={(e) => handleTopicNameChange(index, e.target.value)}
                  placeholder="Topic Name"
                  className="flex-1 py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
                />
                <input
                  type="text"
                  value={topic.videoUrl}
                  onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                  placeholder="Video URL"
                  className="flex-1 py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteTopic(index)}
                  className="text-red-500 text-sm font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No topics added yet</p>
          )}

         
        </div>
        <button
            type="button"
            onClick={handleAddTopic}
            className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded hover:bg-blue-600"
          >
            Add Topic
          </button>
        {/* Submit Button */}
        <div className="mt-15px">
          <ButtonPrimary type="submit">Submit Course</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdmineditCourseMain;
