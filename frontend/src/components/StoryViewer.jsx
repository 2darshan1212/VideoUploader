// components/StoryViewer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const StoryViewer = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stories");
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {stories.map((story) => (
        <div key={story._id} >
          <div>
            <video
              src={story.mediaUrl}
              controls
              autoPlay
              loop
              style={{ width: "300px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryViewer;
