import React from 'react'
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

import { RxCross1 } from "react-icons/rx";

function Navbar() {
    const img_path = "https://image.tmdb.org/t/p/original"

    let [activeMenu, setActiveMenu] = useState(false)

    function ActiveMenu() {
        setActiveMenu(!activeMenu)
    }

    const api_key = import.meta.env.VITE_API_KEY;
    let [searchValue, setSearchValue] = useState("")
    let [searchResults, setSearchResults] = useState([])


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

    function handleChange(event) {
        setSearchValue(event.target.value)
    }

    function getSearchResults() {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${api_key}`)
            .then(res => res.json())
            .then(data => setSearchResults(data))
    }

    useEffect(() => {
        { searchValue === null ? "" : getSearchResults() }
    }, [searchValue])

  

    

    return (
        <>

            <div className={styles.main_container}>
                <div className={styles.element}>
                    <div className={styles.title}>
                        NETFLIX
                    </div>


                    <div className={styles.searchnresults}>
                        <div className={styles.search}>
                            <input className={styles.input} type="text" placeholder='Search' value={searchValue} onChange={handleChange} />
                            <button className={styles.button}><FaSearch color='white' /></button>

                        </div>

                        {searchResults.total_results > 0 ? (
                            <div className={styles.result}>
                                {searchResults.results.map((ele) => {
                                    return (

                                        <Link to={`/home/${ele.id}`} key={ele.id} >
                                            <div className={styles.resultrow}>
                                                <img className={styles.resultimage} src={`${img_path}${ele.poster_path}`} alt="" />
                                                {ele.title}
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>) : null}


                    </div>
                    <div className={styles.links}>
                        <Link to="/home"> <div>Home</div> </Link>

                        <Link to="/home/bookmarks" ><div>Bookmarks</div></Link>
                        <Link to = "/home/review"><div> Reviews</div></Link>
                    </div>

                    <div className={styles.menuIcon}>
                        {
                            windowWidth <= 888 ? activeMenu ? (
                            <div className={styles.menuContainer}>
                                <div>
                                    <RxCross1 color='white' onClick={ActiveMenu}/>
                                </div>
                                <div className={styles.listItem}>
                                    <Link to="/home"> <div className={styles.lii}>Home</div> </Link>

                                    <Link to="/home/bookmarks" ><div className={styles.lii}>Bookmarks</div></Link>
                                    <Link to="/home/review" ><div className={styles.lii}>Reviews</div></Link>
                                </div>
                            </div>) : <IoMenu color='white' onClick={ActiveMenu} /> : ""
                        }
                    </div>
                </div>

            </div>

            <Outlet />


        </>
    )
}

export default Navbar