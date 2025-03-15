"use client";

import { useEffect, useState } from "react";

const CurriculumContentRestricted = ({ id, hasPurchased }) => {
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleVideoClick = (index, youtubeLink) => {
    if (index > 0 && !hasPurchased) {
      setShowPopup(true);
    } else {
      const embedUrl = getEmbedUrl(youtubeLink);
      if (embedUrl) {
        setSelectedVideo(embedUrl);
      } else {
        window.open(youtubeLink, "_blank");
      }
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
              onClick={() => handleVideoClick(index, topic.video_url)}
              className={`px-4 py-2 rounded-lg transition ${
                index === 0 || hasPurchased
                  ? "bg-green-500 text-white hover:bg-yellow-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              <i className="icofont-play-alt-2"></i> Watch Video
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

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold mb-4">
              Buy package to get the course
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumContentRestricted;
