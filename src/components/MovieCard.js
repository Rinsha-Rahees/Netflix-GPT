import React from 'react'
import { TMDB_IMAGE_CDN_URL } from '../utils/Constants'

const MovieCard = ({ posterPath }) => {

  return (
    <div className='w-32 pr-2'>
        <img
          src= {TMDB_IMAGE_CDN_URL + posterPath}
          alt="Netflix Logo"
        />
    </div>
  )
}

export default MovieCard