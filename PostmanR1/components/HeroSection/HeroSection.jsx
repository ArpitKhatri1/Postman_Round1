import React from 'react'
import styles from './HeroSection.module.css'
import { useState, useEffect} from 'react'

function HeroSection() {
    const img_path = "https://image.tmdb.org/t/p/original"
    let [data,setData] = useState(null)

    function FetchData(){
        fetch("https://api.themoviedb.org/3/movie/286217?api_key=86f344f270f2aecd81c4518e38cc8d5f")
        .then(res=>res.json())
        .then(datas=>setData(datas))
    }

    useEffect(()=>{
        FetchData()
    },[])

        
    
  return (
    <>
    {data === null ? "" :
    
    <div className="main_container">
        <div className="image">
        <img src={`${img_path}${data.backdrop_path}`} alt="" />
        </div>
        <div className={styles.text}>
            <h2>{`${data.title}`}</h2>
        </div>
    </div>
}
    




    </>
  )
}

export default HeroSection