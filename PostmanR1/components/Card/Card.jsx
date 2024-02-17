import React from 'react'
import { useState, useEffect } from 'react';
import { IoStarSharp } from "react-icons/io5";
import styles from './Card.module.css'
function Card({ backdrop_path, original_title, release_year,rating }) {
    const img_path = "https://image.tmdb.org/t/p/original"

  

    


    return (
        <>
            <div className={styles.cardContainer}>
                <div>
                   
                   <img className={styles.image} src={`${img_path}${backdrop_path}`} alt="" loading="lazy" /> 
                              
                   
                   
                </div>
                <div className={styles.text}>
                    <div>
                        {original_title}
                    </div>
                    <div className={styles.layer}>
                    <div className={styles.year}>
                        {release_year != undefined ?release_year.split("-")[0]: ""}
                        
                    </div>
                    <div className={styles.star}>
                        {rating!= undefined ? rating.toFixed(1): ""} {rating==null ?  "" : <IoStarSharp color='yellow'/> }
                    </div>
                    </div>



                </div>


            </div>
        </>
    )
}

export default Card