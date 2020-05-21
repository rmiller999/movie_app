import React from 'react'

function Search({handleInput, search, clearSearch}) {
  return (
    <section className="searchbox-wrap">
      <form id="searchForm">
        <input 
              type="text" 
              placeholder="Search for a moive..." 
              className="searchbox" 
              onChange={handleInput}
              onKeyUp={search} />
        <button type="reset" className="clearSearch" onClick={clearSearch}></button>

      </form>
    </section>
  )
}

export default Search
