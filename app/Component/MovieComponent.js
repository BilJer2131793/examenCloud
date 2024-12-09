import React from 'react';

const MovieCard = ({ imageUrl, title, description }) => {
  return (
    <div className="card col-lg-4 col-12">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="/" className="btn btn-primary">📖</a> 
        <a href="/" className="btn btn-dark">🗑️</a>
      </div>
    </div>
  );
};

export default MovieCard;
