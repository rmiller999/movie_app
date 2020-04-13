import React from 'react'
import logo from '../not.jpg';
// import Results from './Results';


function Result({result, openPopup}) {
  const src = result.poster_path;
  // const release_date = result.release_date.slice(0,4);
  let image = ''
  if(src === null) {
    image = logo
  } else {
    image = `https://image.tmdb.org/t/p/w200/${src}`
  }
  const title = result.original_title
  var movieTitle = '';
  if(title.length > 50) {
    movieTitle = title.substring(0,15) + '...'
  } else {
    movieTitle = title;
  }
  return (
    <div className="result" onClick={() => openPopup(result.id)}>
      <img src={image} alt="Movie Poster"></img>
      <div>
        <h3>{movieTitle}</h3>
        {/* <h5>({release_date})</h5> */}

      </div>
    </div>
  )
}

export default Result
