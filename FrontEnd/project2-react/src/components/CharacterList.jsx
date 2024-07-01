import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // const apiUrl = process.env.REACT_APP_API_URL;
    fetch('https://swapi2.azurewebsites.net/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("Fetching characters failed:", error));
  }, []);

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {characters.map((character, index) => (
          <li key={index} style={{cursor: 'pointer'}}>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;