import React from 'react'

function PageButtons({page, pages,handlePageChange}) {
  var pageList = [];
  for(let i = 1; i < pages; i++) {
    pageList.push(i);
  };
  pageList = pageList.slice(0,10);
  return (
    <div className="btnSection">
        {pageList.map((x,i) => (
          <button id="pageBtn" className={page === x ? 'active' : ''} 
          key={i} page={page}
          onClick={() => handlePageChange(x)} >{x}</button>
        ))}
    </div>
  )
}

export default PageButtons
