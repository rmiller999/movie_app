import React from 'react'

function Category({category, handleCategoryChange}) {
  var categoryName = ''
  if(category === "popular") {
    categoryName = "Popularity"
  } else if(category === "top_rated") {
    categoryName = "Top Rated"
  } else if(category === "now_playing") {
    categoryName = "Now Playing"
  }
  return (
    <div className="dropdown">
      <input className="dropbtn" type="submit" value={categoryName} />
      <div className="dropdown-content">
        <a href="/#" className="dropdown__item"
          name='popular'
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Popularity</a>
        <a href="/#" className="dropdown__item"
          name='top_rated'
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Top Rated</a>
        <a href="/#" className="dropdown__item"
          name='now_playing'
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Now Playing</a>
      </div>
  </div>
  )
}

export default Category
