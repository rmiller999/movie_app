import React from 'react'

function Search({handleInput, search}) {
  return (
    <section className="searchbox-wrap">
      <input 
            type="text" 
            placeholder="Search for a moive..." 
            className="searchbox" 
            onChange={handleInput}
            onKeyUp={search} />
    </section>
  )
}

export default Search
