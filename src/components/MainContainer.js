import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    if(!movies) return ;  // Early return !movies (movies are not present, means null) is same as movies === null 

    const mainMovie = movies[0]

    const {original_title, overview, id} = mainMovie

  return (
    <div className='w-full h-fit -mt-24'>
      <div className='hidden xl:flex'>
        <VideoTitle title={original_title} overview={overview}/>
      </div>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer