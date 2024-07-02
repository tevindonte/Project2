import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './config';


function FilmsList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/films`)
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("Fetching Films failed:", error));
  }, []);

  return (
    <div>
      <h1>Star Wars Films</h1>
      <ul>
        {characters.map((film, index) => (
          <li key={index} style={{cursor: 'pointer'}}>
            <Link to={`/films/${film.id}`}>{film.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmsList;