import React from 'react';

function SideBar({genres, handleGenreChange, genre, genrePageChange, pages}) {

  console.log(genre)
  return (
    <div className="genres">
      {genres.map((cat,i) => (
        <li key={i} name={cat.id} 
        className={genre === cat.id ? 'activeGenre' : ''}
        onClick={e => handleGenreChange(cat.id)}>
          {cat.name}
        </li>
      ))}
      
    </div>
  )
}

export default SideBar;
