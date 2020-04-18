import React, { useState, useEffect } from 'react';
import logo from '../not.jpg';
import axios from 'axios';
import loadingGif from '../loadingGif.gif'

const apiKey = '523e9d0683b307c83c56fc95d6c14367';


function Popup({selected, closePopup, changeSelected}) {
  const [state, setState] = useState({
    similar: [],
    videos: [],
    cast: [],
    videosLoading: true
  });

  async function similarMovies(selected,similar) {
    const res = await axios(`https://api.themoviedb.org/3/movie/${selected.id}/similar?api_key=${apiKey}&language=en-US&page=1`)
    const data = await res.data.results;
    setState(prevState => {
      return {...prevState, similar: data}
    })
  }

  async function getCast(selected,similar) {
    const res = await axios(`https://api.themoviedb.org/3/movie/${selected.id}/credits?api_key=${apiKey}`)
    const data = await res.data.cast;
    // console.log("cast",data)
    setState(prevState => {
      return {...prevState, cast: data}
    })
  }

  async function movieVideos(selected) {
    const res = await axios(`https://api.themoviedb.org/3/movie/${selected.id}/videos?api_key=${apiKey}&language=en-US&page=1`)
    const data = await res.data.results;
    setState(prevState => {
      return {...prevState, videos: data, videosLoading: false}
    })
  }

  
  useEffect(() => {
    similarMovies(selected);
    movieVideos(selected);
    getCast(selected);
  }, [selected])
  
  // const changeSelected = movieId => {
  //   axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`).then(({data}) => {
  //     let result = data;
  //     console.log(result)
  //     setState(prevState => {
  //       return {...prevState, selected: result}
  //     })
  //   })
  // }
  const src = selected.poster_path;
  const release_date = selected.release_date.slice(0,4);
  let image = ''
  if(src === null) {
    image = logo
  } else {
    image = `https://image.tmdb.org/t/p/w200/${src}`
  }
  const genres = selected.genres;
  const runtime = selected.runtime;
  function timeConvert(runtime) {
    var num = runtime;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }
  const actors = state.cast;
  // var actorImage = ''
  // actors.map((actor,i) => {
  //   var actorSrc = actor.profile_path
  //   console.log(actorSrc)
  //   if(actorSrc === null) {
  //     actorImage = logo
  //   } else {
  //     actorImage = `https://image.tmdb.org/t/p/w200/${actorSrc}`
  //   }
  // })
  // var newLine = '';
  // for(let i = 0; i < actors.length; i++) {
  //   if(actors[i].name.length > 18) {
  //     newLine = '\n'
  //   }
  // }

  var noVideos;
  var videos = state.videos;
  if(state.videos.length === 0) {
    noVideos = <h5 className="noVideos">({selected.original_title} has no videos)</h5>
  }

  var videos = state.videos.slice(0,5)
  var body = document.getElementsByTagName('body')[0];
  body.classList.add("noscroll")
  return (
    <section className="popup">
      <div className="content">
        <h2>{selected.original_title}<span> ({release_date})</span></h2>
        <p className="rating">Rating: {selected.vote_average}/10</p>
        <p>
          {genres.map((genre,i) => (
            <span className="genre movie-info" key={i}>{genre.name} </span>
          ))}
        </p>
        <span className="movie-info">{timeConvert(runtime)}</span>
        <div className="plot">
          <img className="poster" src={image} alt="Movie Poster" />
          <p className="summary">{selected.overview}</p>
            <h3 className="cast">Cast:</h3>
          <div className="cast-info">
            {actors.map((actor,i) => (
              <div key={i} className="info">
                <img className="actorImg" alt={actor.name} src={'https://image.tmdb.org/t/p/w200/'+actor.profile_path}></img>
                <p key={i} className="actor">{actor.name}</p>
                <p className="actor-role">{actor.character.slice(0,20)}</p>
              </div>
            ))}
          </div>
          <h3 className="videos">{selected.original_title} Videos:</h3>
          <div className="scrolling-wrapper-video">
            {noVideos}
            {videos.map((video,i)=> (
              <iframe key={i} className="card-video" width="320" height="215"
              allowFullScreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen" 
              msallowfullscreen="msallowfullscreen" 
              oallowfullscreen="oallowfullscreen" 
              webkitallowfullscreen="webkitallowfullscreen"
              title="Movie Video"
              frameBorder="0"
              src={"https://www.youtube.com/embed/"+video.key}>
              </iframe>
            ))}

          </div>
        </div>
        <h3 className="similar-movies">Similar Moives:</h3>
        <div className="scrolling-wrapper">
          {state.similar.map((movie,i) => (
            <img onClick={() => changeSelected(movie.id)} key={i} className="card" src={'https://image.tmdb.org/t/p/w200/'+movie.poster_path} alt={movie.original_title} />
          ))}
        </div>
        <button className="close" onClick={closePopup}>close</button>
      </div>
      
    </section>
  )
}

export default Popup
