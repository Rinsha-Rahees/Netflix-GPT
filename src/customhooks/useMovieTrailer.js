import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterTrailer = json.results.find(
      (video) => video.type == "Trailer" && video.name === "Official Trailer"
    );
    const trailer = filterTrailer ? filterTrailer : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  // useEffect(() => {
  //   !trailerVideo;
  // }, []);
};

export default useMovieTrailer;
