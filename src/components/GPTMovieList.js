import React from "react";
import MovieCard from "./MovieCard";

const GPTMovieList = ({ title, movies }) => {
  return (
    <div className="px-12">
      <h1 className="text-base font-semibold py-4 pt-8">{title}</h1>
      <div
        className="flex overflow-x-scroll"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
          WebkitScrollbar: {
            display: "none", // Hide the default scrollbar for Webkit browsers
          },
        }}>
        <div className="grid ">
            <MovieCard key={movies?.id} title={movies?.originalTitleText.text} posterPath={movies?.primaryImage?.url} />
        </div>
      </div>
    </div>
  );
};

export default GPTMovieList;
