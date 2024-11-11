// components/StoryUpload.jsx
import React, { useState } from "react";
import axios from "axios";

const StoryUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile 
      
    ) {
      setFile(selectedFile);
      console.log(selectedFile);
    } else {
      console.log(selectedFile);
      alert("Please upload a video file less than 1 minute.");

      setFile(null);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("media", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/stories/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUpload(res.data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video Story</button>
    </div>
  );
};

export default StoryUpload;
