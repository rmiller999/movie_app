import React from 'react'

function Search({handleInput, search, clearSearch, s}) {
  let clearButton;
  if(s === "") {
    clearButton = <button id="clear" type="reset" className="hidden" onClick={clearSearch}></button>
  } else {
    clearButton = <button id="clear" type="reset" className="clearSearch" onClick={clearSearch}></button>

  }
  return (
    <section className="searchbox-wrap">
      <form id="searchForm">
        <input 
              type="search" 
              placeholder="Search for a moive..." 
              className="searchbox" 
              onChange={handleInput}
              onKeyUp={search} />
        <button id="clear" type="reset" className="clearSearch" onClick={clearSearch}></button>
        {/* {clearButton} */}
      </form>
    </section>
  )
}

export default Search
