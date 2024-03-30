import React from "react";
import { TMDB_IMAGE_CDN_URL } from "../utils/Constants";

const MovieCard = ({ title, posterPath }) => {
  if (!posterPath) return; // Can show something later - enhancement

  return (
    <div className="w-32 pr-2">
      <img
        className="h-full"
        src={TMDB_IMAGE_CDN_URL + posterPath}
        alt={title}
      />
    </div>
  );
};

export default MovieCard;
