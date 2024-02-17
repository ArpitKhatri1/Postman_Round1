import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import styles from './Bookmark.module.css'

function Bookmark() {

  const [bookmarkList, setBookmarkList] = useState([])
  const auth_token = import.meta.env.VITE_AUTH_TOKEN
  const gid = window.localStorage.getItem("sessionToken")
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${auth_token}`
    }
  };


  async function GetBookmarks() {
    const res = await fetch(`https://api.themoviedb.org/3/account/${gid}/favorite/movies`, options)
    const data = await res.json()
    setBookmarkList(data)
  }
  useEffect(() => {
    GetBookmarks()
  }, [])

  console.log(bookmarkList)
  bookmarkList.length == 0 ? console.log(true) : console.log(false)


  
  return (
    <>
      <br /><br />

      <h1>Bookmarks</h1>

      <div className={styles.container}>
        <br />
        {bookmarkList.length == 0 ? (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
  </div>
) : (
  bookmarkList.results.map((ele) => (
    <div key={ele.id}>
      <Link to={`/home/${ele.id}`}>
        <Card
          backdrop_path={ele.poster_path}
          original_title={ele.original_title}
          release_year={ele.release_date}
          rating={ele.vote_average}
        />
      </Link>
    </div>
  ))
)}

        { (bookmarkList && bookmarkList.results == 0) ? <h3>No Bookmarks</h3>: ""}

      </div>



    </>
  )
}

export default Bookmark