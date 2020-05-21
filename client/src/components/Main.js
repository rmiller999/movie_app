import React, { useState, useEffect } from 'react';
import Search from './Search';
import Category from './Category';
import Results from './Results';
import Popup from './Popup';
import SideBar from './SideBar';
// import NavBar from './NavBar';
import PageButtons from './PageButtons';

import axios from 'axios';

const apiKey = '523e9d0683b307c83c56fc95d6c14367';


function Main({user,liftToken}) {
  // console.log("Main",user)
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {},
    page: 1,
    category: 'popular',
    pages: [],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" }
    ],
    genre: 0,
    rating: 0,
    onNetflix: false
    });

  // async function fetchData() {
  //   if(state.s === '') {
  //     const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
  //     const pagesList = await res.data.total_pages;
  //     const data = await res.data.results;
  //     // console.log(pagesList)
  //     setState(prevState => {
  //       return {...prevState, results: data, pages: pagesList}
  //     })    
      
  //   }
  // }
  
  // useEffect(() => {
  //   fetchData()
  //   handlePageChange(state.page)
  // }, [])

  const apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false`;

  async function search(e) {
    // if(e.key === 'Enter') {
      if(state.s === '') {
        const res = await axios(`https://api.themoviedb.org/3/movie/${state.category}?api_key=${apiKey}&language=en-US&page=${state.page}`)
        const data = await res.data.results;
        setState(prevState => {
          return {...prevState, results: data}
        })
      } else {
          axios(apiurl + "&query=" + state.s + "&page=" + state.page).then(({data}) => {
            let results = data.results;
            const pagesList = data.total_pages;
            // console.log(pagesList)
            setState(prevState => {
              return {...prevState, results: results, pages: pagesList, page: 1, genre: 0}
            })
          })

      }
    // }
  }

  async function clearSearch(e) {
    let s = e.target.value;
    document.getElementById("searchForm").value = "";
    const res = await axios(`https://api.themoviedb.org/3/movie/${state.category}?api_key=${apiKey}&language=en-US&page=${state.page}`)
    const data = await res.data.results;
        setState(prevState => {
          return {...prevState, results: data}
        })
    setState(prevState => {
      return {...prevState, s: s, page: 1, category: state.category, genre: state.genre}
    })
  }

  async function handlePageChange(page,s,results,genre) {
    if(state.s === '' && state.genre === 0) {
      const res = await axios(`https://api.themoviedb.org/3/movie/${state.category}?api_key=${apiKey}&language=en-US&page=${page}`)
      const data = await res.data.results;
    // // console.log(page)
      setState(prevState => {
        return {...prevState, results: data}
      })
    }  if(state.genre > 0) {
        const res = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${state.genre}&include_adult=false&page=${page}`)
        const data = await res.data.results;
        // console.log(data)
        setState(prevState => {
          return {...prevState, results: data}
        })
    } if(state.s.length > 0) {
      axios(apiurl + "&query=" + state.s + "&page=" + page).then(({data}) => {
        let results = data.results;
        // const pagesList = data.total_pages;
        // console.log(pagesList)
        setState(prevState => {
          return {...prevState, results: results, genre: 0}
        })
      })
    }
    setState(prevState => {
      return {...prevState, page: page}
    });
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return {...prevState, s: s}
    });
  }

  const openPopup = id => {
    axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`).then(({data}) => {
      let result = data;

      setState(prevState => {
        return {...prevState, selected: result}
      })
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}}
    });
    var body = document.getElementsByTagName('body')[0];
  body.classList.remove("noscroll")
  }

  async function handleCategoryChange(category) {
    setState(prevState => {
      return {...prevState, category: category}
    });
    const res = await axios(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${state.page}`)
    const data = await res.data.results;
    // console.log(page)
    setState(prevState => {
      return {...prevState, results: data, genre: 0}
    })
  }
  async function changeSelected(movieId,rating,onNetflix) {
    axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`).then(({data}) => {
      let result = data;
      setState(prevState => {
        return {...prevState, onNetflix: false}
      }) 
      // const titleFix = result.original_title.replace(/ /g,"_");
      // const release_date = result.release_date.slice(0,4);
      // console.log(titleFix)
      // axios.post('/scrape', {
      //   movie: titleFix,
      // }).then(res => {
      //   console.log('from main',res)
      //   setState(prevState => {
      //     return {...prevState, onNetflix: true}
      //   }) 
      // })
      if (user) {
        axios.get(`users/${user._id}/ratings`).then((res) => {
          var ratings = res.data;
          ratings.forEach((rating,i) => {
            if(rating.id === result.id) {
              console.log("from Main rated movie:",state.rating)
              console.log("Selected movie:",state.selected.id)
              setState(prevState => {
                return {...prevState, rating: state.rating}
              })          
            } else if(rating.id !== result.id)  {
              
              setState(prevState => {
                return {...prevState, rating: 0}
              })
            }
          })
        })
      }
      setState(prevState => {
        return {...prevState, selected: result}
      })
      
    })
  }

  async function handleGenreChange(genre,page) {
    setState(prevState => {
      return {...prevState, genre: genre}
    });
    // console.log("genre:", genre)
    const res = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genre}&include_adult=false&page=${page}`)
    const data = await res.data.results;
    const pagesList = res.data.total_pages;
    // console.log(res)
    // console.log(page)
    setState(prevState => {
      return {...prevState, results: data, pages: pagesList, page: 1, category: ''}
    })
  }

  async function genrePageChange(genre,page) {
    if(state.genre > 0) {
      const res = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${state.category}&with_genres=${genre}&include_adult=false&page=${page}`)
      const data = await res.data.results;
      // console.log(page)
      setState(prevState => {
        return {...prevState, results: data}
      })
    }

  }

  useEffect(() => {
    async function fetchData() {
      if(state.s === '') {
        const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
        const pagesList = await res.data.total_pages;
        const data = await res.data.results;
        // console.log(pagesList)
        setState(prevState => {
          return {...prevState, results: data, pages: pagesList, rating: state.rating}
        })    
        
      }
    }
    fetchData()
    handlePageChange(state.page)
  }, [])

  return (
    <div className="App">
      {/* <header>
        <h1>Movie DB</h1>
      </header> */}
      <div className="container">
        <main>
          <Search handleInput={handleInput} search={search} clearSearch={clearSearch} s={state.s}/>
          <Category category={state.category} handleCategoryChange={handleCategoryChange}/>
          <SideBar genrePageChange={genrePageChange} genre={state.genre} page={state.page} pages={state.pages} genres={state.genres} handleGenreChange={handleGenreChange} />
          <Results s={state.s} results={state.results} openPopup={openPopup} user={user} />
          <PageButtons page={state.page} pages={state.pages} handlePageChange={handlePageChange}/>
          {(typeof state.selected.original_title != "undefined") ? <Popup liftToken={liftToken} user={user} selected={state.selected} closePopup={closePopup} changeSelected={changeSelected} onNetflix={state.onNetflix} /> : false}
        </main>

      </div>
    </div>
  );
}

export default Main;