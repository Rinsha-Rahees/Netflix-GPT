import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTrendingMovies from "../customhooks/useTrendingMovies";
import usePopularMovies from "../customhooks/usePopularMovies";
import useUpcomingMovies from "../customhooks/useUpcomingMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTrendingMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <div className="w-full h-full">
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <div className="hidden md:flex text-white">
            <MainContainer />
          </div>
          <div className="bg-black text-white">
            <SecondaryContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
