import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTrendingMovies from "../customhooks/useTrendingMovies";
import usePopularMovies from "../customhooks/usePopularMovies";
import useUpcomingMovies from "../customhooks/useUpcomingMovies";
import useMovieTrailer from "../customhooks/useMovieTrailer";

const Browse = () => {
  useNowPlayingMovies();
  useTrendingMovies()
  usePopularMovies()
  useUpcomingMovies()

  return (
    <div className="w-full h-full text-white">
        <Header />
      <div className="hidden md:flex">
        <MainContainer />
      </div>
      <div className="bg-black">
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browse;
