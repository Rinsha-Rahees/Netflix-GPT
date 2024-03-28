import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-12">
      <h1 className="text-xl md:text-3xl py-4 pt-8">{title}</h1>
      <div
        className="flex overflow-x-scroll"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
          WebkitScrollbar: {
            display: "none", // Hide the default scrollbar for Webkit browsers
          },
        }}>
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie?.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
