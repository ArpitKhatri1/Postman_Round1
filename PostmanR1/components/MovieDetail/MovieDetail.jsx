import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import styles from './MovieDetail.module.css'
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
function MovieDetail() {

    const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmYzNDRmMjcwZjJhZWNkODFjNDUxOGUzOGNjOGQ1ZiIsInN1YiI6IjY1YzM5OWI3Yjc2Y2JiMDE4NDEwMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwR7ehUIyuMm8mZeAQTwwv_AbIpj-erKoTFZS_phhcM';
    const gid = window.localStorage.getItem("sessionToken")
    const api_key = '86f344f270f2aecd81c4518e38cc8d5f';

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

        window.localStorage.setItem(movieDetails.id, true)

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
            .then(data => console.log(data))
            .catch(err => console.error(err));

        setIsFavourite(false)
        window.localStorage.removeItem(movieDetails.id)

    }


    

   
        const options = {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmYzNDRmMjcwZjJhZWNkODFjNDUxOGUzOGNjOGQ1ZiIsInN1YiI6IjY1YzM5OWI3Yjc2Y2JiMDE4NDEwMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwR7ehUIyuMm8mZeAQTwwv_AbIpj-erKoTFZS_phhcM'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${1214314}/rating`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    



    const [movieDetails, setMovieDetails] = useState(null)
    async function FetchMovie() {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${api_key}`)
        const data = await res.json()
        setMovieDetails(data)

    }

    useEffect(() => {
        FetchMovie()
    }, [])

    function CheckFavourite() {
        const status = window.localStorage.getItem(movieDetails.id)
        status == "true" ? setIsFavourite("true") : ""
    }

    useEffect(() => {
        { movieDetails != null ? CheckFavourite() : "" }
    }, [movieDetails])

    function showRating() {
        setRateState(!rateState)

    }
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
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
        setRateState(!rateState)

        window.localStorage.setItem(`${movieDetails.id}r`,ele)

    }

    function checkRating(){
        const ratingData  = window.localStorage.getItem(`${movieDetails.id}r`) 
        setMovieRating(ratingData)
        
    }
    useEffect(()=>{
        {movieDetails != null ? checkRating() : ""}
    },[movieDetails])

  
   


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
                                    |
                                    <div className={styles.genre}>{movieDetails.genres.map((ele) => {
                                        return (
                                            <span>{ele.name}</span>
                                        )
                                    })}</div>
                                    |
                                    <div>
                                        { Math.floor(movieDetails.runtime / 60)  != 0 ?`${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m` : ""}
                                    </div>
                                </div>
                                <br />
                                <div className={styles.rateSection}>
                                    <div>
                                        <i> {movieDetails.tagline}</i>
                                    </div>
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
            ) : ""}

        </>
    )
}

export default MovieDetail