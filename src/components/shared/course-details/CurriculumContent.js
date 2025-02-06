"use client";

import { useEffect, useState } from "react";
import accordions from "@/libs/accordions";
import Link from "next/link";

const CurriculumContent = ({ id }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    accordions();
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/gettopics/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.topics)) {
            setTopics(data.topics);
          } else {
            console.error(`Topics data for course ${id} is not an array`, data);
          }
        })
        .catch((error) => console.error(`Error fetching topics for course ${id}:`, error));
    }
  }, [id]);

  const handleFirstVideoClick = (youtubeLink) => {
    if (youtubeLink) {
      window.location.href = youtubeLink;
    }
  };

  return (
    <div>
      <ul className="accordion-container curriculum">
        <li className="accordion mb-25px overflow-hidden active">
          <div className="bg-whiteColor border border-borderColor dark:bg-whiteColor-dark dark:border-borderColor-dark rounded-t-md">
            <div>
              <div className="cursor-pointer accordion-controller flex justify-between items-center text-xl text-headingColor font-bold w-full px-5 py-18px dark:text-headingColor-dark font-hind leading-[20px]">
                <div className="flex items-center">
                  <span>Course Topics</span>
                  <p className="text-xs text-headingColor dark:text-headingColor-dark px-10px py-0.5 ml-10px bg-borderColor dark:bg-borderColor-dark rounded-full">
                    {topics.length} Topics
                  </p>
                </div>
                <svg
                  className="transition-all duration-500 rotate-0"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#212529"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="accordion-content transition-all duration-500">
              <div className="content-wrapper p-10px md:px-30px">
                <ul>
                  {topics.map((topic, index) => (
                    <li
                      key={index}
                      className="py-4 flex items-center justify-between flex-wrap border-b border-borderColor dark:border-borderColor-dark"
                    >
                      <div>
                        <h4 className="text-blackColor dark:text-blackColor-dark leading-1 font-light">
                          <i className="icofont-video-alt mr-10px"></i>
                          <span className="font-medium">Video :</span> {topic.topic_name}
                        </h4>
                      </div>
                      <div className="text-blackColor dark:text-blackColor-dark text-sm flex items-center">
                        <p>
                          <i className="icofont-clock-time"></i> {topic.duration || "N/A"}
                        </p>
                        {index === 0 && topic.video_url ? (
                          <button
                            onClick={() => handleFirstVideoClick(topic.video_url)}
                            className="bg-primaryColor text-whiteColor text-sm ml-5 rounded py-0.5 px-10px"
                          >
                            <i className="icofont-eye"></i>  View
                          </button>
                        ) : topic.preview ? (
                          <Link
                            href={`/lessons/${topic.id}`}
                            className="bg-primaryColor text-whiteColor text-sm ml-5 rounded py-0.5 px-10px"
                          >
                            <i className="icofont-eye"></i> Preview
                          </Link>
                        ) : (
                          <p className="text-contentColor dark:text-contentColor-dark text-sm">
                            <i className="icofont-lock"></i>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CurriculumContent;