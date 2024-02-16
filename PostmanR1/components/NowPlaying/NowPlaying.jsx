import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';
import styles from './NowPlaying.module.css'
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Spinner from '../Spinner/Spinner';

function NowPlaying() {


    const api_key = import.meta.env.VITE_API_KEY;

    const [discoverMovieList, setDiscoverMovieList] = useState(null)

    async function fetchMovie() {
        let initial_data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&with_original_language=en`)
        let res = await initial_data.json()
        setDiscoverMovieList(res.results)
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    function ScrollLeft() {
        let slider = document.getElementById("slider_Discover")
        slider.scrollLeft = slider.scrollLeft - 500

    }

    function ScrollRight() {
        let slider = document.getElementById("slider_Discover")
        slider.scrollLeft = slider.scrollLeft + 500

    }
   
    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.heading}>
                    <h2>Now Playing</h2>
                </div>
                <div className={styles.arrow}>
                    <MdChevronLeft onClick={ScrollLeft} size="100px"/>
                    <div className={styles.discover_container} id="slider_Discover">

                        {discoverMovieList!= null ? discoverMovieList.map((ele) => {
                            return (
                                <div key={ele.id}>
                                    <Link to={`/home/${ele.id}`}>

                                        <Card backdrop_path={ele.poster_path}
                                            original_title={ele.original_title}
                                            release_year={ele.release_date}
                                            rating = {ele.vote_average}
                                        />

                                    </Link >
                                </div>
                            )
                        }) : (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                            </div>
                        )
                        }
                    </div>
                    <MdChevronRight onClick={ScrollRight} size="100px" />
                </div>
            </div>
        </>
    )
}

export default NowPlaying