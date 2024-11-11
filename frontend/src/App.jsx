// App.js
import React from "react";
import StoryUpload from "./components/StoryUpload";
import StoryViewer from "./components/StoryViewer";

function App() {
  return (
    <div className="App">
      <h1>Video Stories</h1>
      <StoryUpload
        onUpload={(newStory) => console.log("Story uploaded:", newStory)}
      />
      <StoryViewer />
    </div>
  );
}

export default App;
