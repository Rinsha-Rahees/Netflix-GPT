import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";
import OpenAi from "../utils/OpenAi";
import { API_OPTIONS } from "../utils/Constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch()
  const langKey = useSelector((store) => store.config?.lang);
  const searchText = useRef(null);


  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json()

    return json.results
  };

  const handleGptSearchClick = async () => {

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Sholay, Tangled, Manjummal Boys, Koi Mil Gaya, The Goat Life";

    const gptResults = await OpenAi.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      //TODO: Error handling
    }

    const gptMovies = gptResults.choices?.[0].message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)) // [Promise, Promise, Promise, Promise, Promise,]

    const tmdbResults = await Promise.all(promiseArray) // Tales time to return -> Show loading on the screen


    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))


  };

  return (
    <div className="flex justify-center w-full z-10 mt-[30%] md:mt-24">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full md:w-2/3 h-fit p-2 bg-black rounded-md">
        <input
          ref={searchText}
          className="py-2 px-4 w-full rounded-l-md"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="px-4 w-1/3 md:w-1/6 bg-purple-600 text-white rounded-r-md"
          onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
