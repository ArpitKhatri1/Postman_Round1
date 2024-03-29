import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import styles from './MovieDetail.module.css'
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
function MovieDetail() {

    const auth_token = import.meta.env.VITE_AUTH_TOKEN
    const gid = window.localStorage.getItem("sessionToken")
    const api_key = import.meta.env.VITE_API_KEY;

    const [isFavourite, setIsFavourite] = useState(false)
    const [rateState, setRateState] = useState(false)
   

    
   
    
    const img_path = "https://image.tmdb.org/t/p/original"

    const params = useParams()

    function AddFavourite() {

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
            body: JSON.stringify({ media_type: 'movie', media_id: `${movieDetails.id}`, favorite: true })
        };

        fetch(`https://api.themoviedb.org/3/account/${gid}/favorite`, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
        setIsFavourite(true)

        

    }

    function RemoveFavourite() {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
            body: JSON.stringify({ media_type: 'movie', media_id: `${movieDetails.id}`, favorite: false })
        };

        fetch(`https://api.themoviedb.org/3/account/${gid}/favorite`, options)
            .then(response => response.json())
            .then((data)=>{
                console.log(data)
                setIsFavourite(false)
            })
            .catch(err => console.error(err));
            

    }


    
   
      



    const [movieDetails, setMovieDetails] = useState(null)
    async function FetchMovie() {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${api_key}`)
        const data = await res.json()
        setMovieDetails(data)

    }

    useEffect(() => {
        FetchMovie()
    }, [])
    

    

    function showRating() {
        setRateState(!rateState)

    }
   
    const arr = [1,2,3,4,5]

    const [movieRating,setMovieRating] = useState(null)

    function rateMovie(ele){
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${auth_token}`
            },
            body: `{"value":${ele}}`
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieDetails.id}/rating`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        setMovieRating(ele)
        setRateState(false)

        

    }


    async function checkBookmark(){

        const options1 = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${auth_token}`
            }
          }
       

          const res = await fetch(`https://api.themoviedb.org/3/account/${gid}/favorite/movies`, options1)
          const data = await res.json()
          
          data.results.forEach((ele)=>{
            if (ele.id == movieDetails.id){
                setIsFavourite(true)
            }
          })
          

    }

    async function checkRated(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${auth_token}`
            }
          };
        
        
            const res = await fetch(`https://api.themoviedb.org/3/account/${gid}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`, options)
            const data = await res.json()
            data.results.forEach((ele)=>{
                if (ele.id == movieDetails.id){
                    setMovieRating(ele.rating)
                }
              })
          
    }

   {movieDetails != null ? setTimeout(checkRated,500): ""} 
    
        {movieDetails != null ? checkBookmark() : ""}

    

    

  
    

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        function watchWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)
        return function () {
            window.removeEventListener("resize", watchWidth)

        }


    }, [windowWidth])
      
   

   
    
    
  
   


    return (
        <>


            {movieDetails !== null ? (
                <>

                    <div className={styles.graphicContainer} >
                        <div className={styles.info}>
                            <div className={styles.images}>
                                <div className={styles.temp}>
                                <div><img className={styles.poster} src={`${img_path}${movieDetails.poster_path}`} alt="" /></div>
                                <div><img className={styles.postertemp} src={`${img_path}${movieDetails.poster_path}`} alt="" /></div>
                                </div>
                            </div>
                            <div className={styles.textdata}>
                                <div className={styles.bookmark}>
                                    <div className={styles.title}>
                                        <h1>{movieDetails.title}</h1>
                                    </div>
                                    <div className={styles.bmicon} onClick={isFavourite ? RemoveFavourite : AddFavourite}>
                                        {
                                            isFavourite ? <FaBookmark size="1.5rem" /> : <FaRegBookmark size="1.5rem" />
                                        }
                                    </div>
                                </div>

                                <div className={styles.addinfo1}>
                                    <div>
                                        {movieDetails.release_date}
                                    </div>
                                    {windowWidth <= 485 ? "" : "|"}
                                    <div className={styles.genre}>{movieDetails.genres.map((ele) => {
                                        return (
                                            <span>{ele.name}</span>
                                        )
                                    })}</div>
                                    {windowWidth <= 485 ? "" : "|"}
                                    <div>
                                        { Math.floor(movieDetails.runtime / 60)  != 0 ?`${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m` : ""}
                                    </div>
                                </div>
                                <br />
                                <div className={styles.rateSection}>
                                    <div>
                                        <i> {movieDetails.tagline}</i>
                                    </div>
                                    {windowWidth<=680 ? (<br/>) : ""}
                                    {movieRating != null ? (
                                        
                                        <div className={styles.ratedMovie}>
                                            <b>Your Rating :-</b> {movieRating}{" "}<FaStar color='yellow' size=".8rem" />
                                            
                                        </div>

                                        
                                        
                                    ) 
                                    : (
                                        <div className={styles.rateStars}>
                                        <div className={styles.rate} onClick={showRating}>Rate
                                        </div>

                                        {rateState ?
                                            <div className={styles.optionlist} >

                                                {arr.map((ele)=>{
                                                    return(
                                                    <div className={styles.option} id = {ele} key = {ele} onClick={()=>rateMovie(ele)}>
                                                        <div>{ele}{" "}<FaStar color='yellow' size=".8rem" />
                                                        </div>
                                                    </div>
                                                    )
                                                })}
                                                



                                            </div>
                                            : ""}
                                    </div>)}
                                    



                                </div>
                                <div className={styles.overview}>
                                    <h3>Overview</h3>
                                    <br />
                                    <p>{movieDetails.overview}</p>

                                </div>
                            </div>

                        </div>


                    </div>

                  




                </>
            ) : (<div className={styles.loading}>
                <div className={styles.spinner}></div>
            </div>)}

        </>
    )
}

export default MovieDetail