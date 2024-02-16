import React from 'react'
import NowPlaying from '../NowPlaying/NowPlaying'

import Navbar from '../Navbar/Navbar'
import TopRated from '../TopRated/TopRated'
import MovieList from '../MovieList/MovieList'
function HomePage() {
  return (
    
   <>
   <Navbar/>
   <br /><br /><br />
   
    <NowPlaying/>
    <br />
    <br />
    <TopRated/>
    <br />
    
    <MovieList/>
    </>
  )
}

export default HomePage