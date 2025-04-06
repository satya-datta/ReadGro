"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CurriculumContentRestricted = ({ id, hasPurchased }) => {
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [packageNames, setPackageNames] = useState([]); // Store package names
  const router = useRouter();

  useEffect(() => {
    if (id) {
      // Fetch course topics
      fetch(`http://localhost:5000/gettopics/${id}`)
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

      // Fetch package names mapped to this course
      fetch(`http://localhost:5000/getpackagebycourse/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.packages)) {
            setPackageNames(data.packages.map((pkg) => pkg.package_name));
          } else {
            console.error(
              `Package data for course ${id} is not an array`,
              data
            );
          }
        })
        .catch((error) =>
          console.error(`Error fetching packages for course ${id}:`, error)
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
              className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition 
    ${
      index === 0 || hasPurchased
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-400 text-white cursor-not-allowed"
    }`}
            >
              <i className="icofont-play-alt-2 text-sm"></i>
              <span className="whitespace-nowrap">Watch Video</span>
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
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-96">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">BUY COURSE</h2>
            <p className="text-md mb-2 text-gray-600">
              This course is available in:
            </p>

            <ul className="list-disc text-left pl-6 mb-4 text-gray-800">
              {packageNames.length > 0 ? (
                packageNames.map((pkg, index) => (
                  <li key={index} className="text-lg font-medium">
                    {pkg}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No packages available</li>
              )}
            </ul>

            {/* View Plans Button */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
              onClick={() => router.push("/packages")}
            >
              View Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumContentRestricted;
