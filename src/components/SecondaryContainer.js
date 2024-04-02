import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
import lang from '../utils/LanguageConstants'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)
  const langKey = useSelector(store => store.config?.lang)

  return (
    movies && (
    <div className='w-full relative h-full z-10 mt-16 md:-mt-56'>
      <MovieList title={lang[langKey].nowPlaying} movies={movies?.nowPlayingMovies}/>
      <MovieList title={lang[langKey].trendingMovies} movies={movies?.trendingMovies}/>
      <MovieList title={lang[langKey].popularMovies} movies={movies?.popularMovies}/>
      <MovieList title={lang[langKey].upcomingMovies} movies={movies?.upcomingMovies}/>
    </div>
    )
  )
}

export default SecondaryContainer