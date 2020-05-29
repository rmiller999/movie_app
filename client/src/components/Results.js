import React from 'react';
import Result from './Result';

function Results({results, openPopup, user, handlePageChange, page, pages}) {
  let movies;
  if(results.length === 0) {
    movies = (
      <section className="results">
        <h1>No movies found!</h1>
        </section>
    )
  } else {
    movies = (<section className="results">
    {results.map(result => (
      <Result key={result.id} user={user} result={result} openPopup={openPopup} />
    ))}
  </section>)
  }
  return (
    <section className="results">
      {movies}
    </section>
  )
}

export default Results
