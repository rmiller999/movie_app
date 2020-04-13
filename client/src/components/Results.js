import React from 'react';
import Result from './Result';

function Results({results, openPopup, handlePageChange, page, pages}) {

  // const pages = [1,2,3,4,5,6,7,8,9,10];
  // console.log("pages",pages)

  // var pageList = [];
  // for(let i = 1; i < pages; i++) {
  //   pageList.push(i);
  // };
  // pageList = pageList.slice(0,10);

  return (
    <section className="results">
      {results.map(result => (
        <Result key={result.id} result={result} openPopup={openPopup} />
      ))}
      {/* <div className="btnSection">
        {pageList.map((x,i) => (
          <button id="pageBtn" className={page === x ? 'active' : ''} 
          key={i} page={page}
          onClick={() => handlePageChange(x)} >{x}</button>
        ))}
      </div> */}
    </section>
  )
}

export default Results
