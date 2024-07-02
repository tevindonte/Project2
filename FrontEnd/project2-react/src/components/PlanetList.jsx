import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './config';


function PlanetList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/planets`)
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("Fetching Planets failed:", error));
  }, []);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <ul>
        {characters.map((planet, index) => (
          <li key={index} style={{cursor: 'pointer'}}>
            <Link to={`/Planet/${planet.id}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetList;