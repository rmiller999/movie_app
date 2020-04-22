import React from 'react';
import Result from './Result';

function Results({results, openPopup, user, handlePageChange, page, pages}) {
  return (
    <section className="results">
      {results.map(result => (
        <Result key={result.id} user={user} result={result} openPopup={openPopup} />
      ))}
    </section>
  )
}

export default Results
