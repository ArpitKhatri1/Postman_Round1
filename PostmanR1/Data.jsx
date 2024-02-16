import React from 'react'
import { useEffect, useState } from 'react';


function Data() {

    const api_key = import.meta.env.VITE_API_KEY;

    const [movieList, setMovieList] = useState([])

    async function fetchMovie() {
        let initial_data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
        let res = await initial_data.json()
         
        setMovieList(res.results)
    }

    useEffect(() => {
       fetchMovie()
    }, [])

    
    console.log(movieList)

    return (
        <>
        
        {movieList ? movieList.map((ele)=>{
            return (
                <>
                {ele.title}
                <br/>
                </>
            )
        }): null
        }
        
        </>
        
    )
}

export default Data