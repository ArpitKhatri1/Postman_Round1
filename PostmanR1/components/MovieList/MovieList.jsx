import React from 'react'
import { useState, useEffect } from 'react';
import styles from './Movies.module.css'
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

function MovieList() {
  const [page, setPage] = useState(1);
  const api_key = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(null)

  async function FetchList() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`)
    const data = await res.json()
    setData(prevData => [...prevData,...data.results])
    setTotalPage(data.total_pages)

  }

  useEffect(() => {
    FetchList()
  }, [page])

    function LoadMore(){
      setPage(page+1)
    }

      

  return (
    <>
      <h2>Discover</h2>
      <br />
      <div className={styles.container}>
        {data .length >0 && data!=undefined ? (
          data.map((ele) => {
            return(
            <div key={ele.id}>
              <Link to={`/home/${ele.id}`}>

                <Card backdrop_path={ele.poster_path}
                  original_title={ele.original_title}
                  release_year={ele.release_date}
                  rating={ele.vote_average}
                />

              </Link >
            </div>
            )

          })


        ) : (

          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div >

        )
        }
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick = {LoadMore}>Load More</button>
      </div>

    </>
  )
}

export default MovieList