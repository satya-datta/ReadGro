"use client";

import { useEffect, useState } from "react";

const CurriculumContent = ({ id }) => {
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://readgro-backend.onrender.com/gettopics/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.topics)) {
            setTopics(data.topics);
          } else {
            console.error(`Topics data for course ${id} is not an array`, data);
          }
        })
        .catch((error) =>
          console.error(`Error fetching topics for course ${id}:`, error)
        );
    }
  }, [id]);

  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com"
      ) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      } else if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.substring(1)}`;
      }
      return url;
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return "";
    }
  };

  const handleVideoClick = (youtubeLink) => {
    const embedUrl = getEmbedUrl(youtubeLink);
    if (embedUrl) {
      setSelectedVideo(embedUrl);
      setShowVideoModal(true);
    } else {
      window.open(youtubeLink, "_blank");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Topics</h2>
      <ul className="divide-y border rounded-lg">
        {topics.map((topic, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleVideoClick(topic.video_url)}
                className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-600 rounded-full hover:bg-blue-100"
              >
                <i className="icofont-play-alt-2 text-sm"></i>
              </button>

              <span className="text-sm font-medium text-gray-800">
                {topic.topic_name} : {index + 1}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setShowVideoModal(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <iframe
                src={selectedVideo}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumContent;
