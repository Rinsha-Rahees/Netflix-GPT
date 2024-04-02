import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_POSTER } from "../utils/Constants";

const GptSearchPage = () => {
  return (
    <>
      <div className="absolute w-full h-screen top-0 -z-10">
        <img
          className="fixed h-screen w-full object-cover"
          src={BG_POSTER}
          alt="Netflix_Background_Image"
        />
      </div>

      <div className="mt-[9%]">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearchPage;
