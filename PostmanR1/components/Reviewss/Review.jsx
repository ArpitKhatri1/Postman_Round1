import React from 'react'
import { useState,useEffect } from 'react'
import styles from './Review.module.css'
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
function Review() {
    const api_key = import.meta.env.VITE_API_KEY;
    const gid = window.localStorage.getItem("sessionToken")
    const[reviews,setReviews] = useState(null)
    const auth_token = import.meta.env.VITE_AUTH_TOKEN;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${auth_token}`
        }
      };
    
    
      async function GetReviews() {
        const res = await fetch(`https://api.themoviedb.org/3/account/${gid}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`, options)
        const data = await res.json()
        setReviews(data)
      }

  

        useEffect(()=>{
            GetReviews()
        },[])


    console.log(reviews)
  return (
   <>
   <br /><br />

<h1>Reviwed Movies</h1>

<div className={styles.rcontainer}>
  <br />
  { reviews && reviews.results  ? reviews.results.map((ele) => {
    return (
      <div key={ele.id}>
        <Link to={`/home/${ele.id}`}>

          <Card backdrop_path={ele.poster_path}
            original_title={ele.original_title}
            release_year={ele.release_date}
            
          />

        </Link >
      </div>
    )
  }) : ""}

{ reviews != null && (reviews.results  == 0) ? <h3>No Reviews</h3>: ""}

  </div>



   </>
  )
}

export default Review