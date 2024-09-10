import React from "react";
import "@css/Loader.css"; // Create a CSS file for loader styles

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
