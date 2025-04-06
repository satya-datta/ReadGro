"use client";

import { useEffect, useState } from "react";

const CurriculumContent = ({ id }) => {
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    } else {
      window.open(youtubeLink, "_blank");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Topics</h2>
      <ul className="border border-gray-300 rounded-lg p-4">
        {topics.map((topic, index) => (
          <li
            key={index}
            className="py-4 px-2 border-b last:border-none flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-medium">{topic.topic_name}</h4>
            </div>
            <button
              onClick={() => handleVideoClick(topic.video_url)}
              className="px-6 py-7 text-xs font-medium rounded-md flex items-center gap-2 transition bg-blue-600 hover:bg-blue-700 text-white"
            >
              <i className="icofont-play-alt-2"></i>
              <span className="hidden sm:inline ml-2">Watch Video</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedVideo ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Now Playing:</h3>
          <iframe
            width="100%"
            height="400"
            src={selectedVideo}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-red-500 mt-4">No video selected.</p>
      )}
    </div>
  );
};

export default CurriculumContent;
