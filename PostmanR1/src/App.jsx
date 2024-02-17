import './App.css'
import HomePage from '../components/HomePage/HomePage'
import MovieDetail from '../components/MovieDetail/MovieDetail'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Bookmark from '../components/Bookmark/Bookmark'
import Navbar from '../components/Navbar/Navbar'
import Review from '../components/Reviewss/Review'

function App() {

  
  const [requestToken, setRequestToken] = useState(null)
  
  const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmYzNDRmMjcwZjJhZWNkODFjNDUxOGUzOGNjOGQ1ZiIsInN1YiI6IjY1YzM5OWI3Yjc2Y2JiMDE4NDEwMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwR7ehUIyuMm8mZeAQTwwv_AbIpj-erKoTFZS_phhcM';

  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${auth_token}`
    }
  };

  async function FetchToken() {

    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
    const data = await res.json()
    console.log(data)
    if (data.guest_session_id) {
      setRequestToken(data.guest_session_id)
    }

  }



  useEffect(() => {
  
    FetchToken()
  }, [])

  useEffect(() => {
    { requestToken !== null ? window.localStorage.setItem("sessionToken", requestToken) : null }
  }, [requestToken])


  


  return (
    <>
      <Routes>
        
        <Route element={<Navbar />}>
        <Route path='/'element = {<HomePage/>}></Route>
        <Route path="/home" element={<HomePage />} ></Route>
        <Route path="/home/:id" element={<MovieDetail  />} ></Route>
        <Route path="/home/bookmarks" element={<Bookmark  />} ></Route>
        <Route path = "/home/review" element= {<Review/>}></Route>
        </Route>
      </Routes>


    </>

  )
}

export default App
