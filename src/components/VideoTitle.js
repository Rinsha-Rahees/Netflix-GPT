import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black pt-32 px-12 ">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="my-4 w-1/2">{overview}</p>
      <div className="font-semibold my-6">
        <button className="bg-white text-black p-2 px-6 mr-4 border rounded-sm hover:opacity-80">Play</button>
        <button className="bg-gray-500 text-white p-2 px-6 border rounded-sm opacity-85 hover:opacity-70">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
