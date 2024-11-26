import React from "react";
import { useSelector } from "react-redux";
import GPTMovieList from "../components/GPTMovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return; // Error Page/Shimmer UI
  return (
    <div className="bg-black bg-opacity-90 text-white z-10 mt-16 pb-10">
      {movieNames.map((movieName, index) => (
        <GPTMovieList key={movieName} title={movieName} movies={movieResults[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
