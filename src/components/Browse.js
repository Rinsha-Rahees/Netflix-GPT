import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {

  useNowPlayingMovies();

  return (
    <div className="w-full h-screen bg-black text-white">
      <Header/>
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
