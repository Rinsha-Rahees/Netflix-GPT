import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_POSTER } from "../utils/Constants";

const GptSearchPage = () => {
  return (
    <div className="flex flex-col justify-between w-full h-screen mt-[9%]">
      <img
        className="fixed blur-md top-0 w-full -z-10"
        src={BG_POSTER}
        alt="Netflix_Background_Image"
      />

      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
