import { useEffect } from "react";
import { API_MOVIES_OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector(store => store.movies?.upcomingMovies)

  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(
        "https://imdb-top-100-movies.p.rapidapi.com/",
        API_MOVIES_OPTIONS
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      dispatch(addUpcomingMovies(data));
    } catch (error) {
      console.error("Failed to fetch movies:", error.message);
    }
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, [upcomingMovies, getUpcomingMovies]);
};

export default useUpcomingMovies;
