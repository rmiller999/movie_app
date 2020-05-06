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
      // {/* <input  type="submit" value={categoryName} /> */}
      <div className="categories">
        <a href="/#" 
          name='popular'
          className={categoryName === "Popularity" ? 'activeCategory' : ''}
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Popularity</a>
        <a href="/#" 
          name='top_rated'
          className={categoryName === "Top Rated" ? 'activeCategory' : ''}
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Top Rated</a>
        <a href="/#" 
          name='now_playing'
          className={categoryName === "Now Playing" ? 'activeCategory' : ''}
          onClick={e => handleCategoryChange(e.currentTarget.name)}>Now Playing</a>
      </div>

  )
}

export default Category
