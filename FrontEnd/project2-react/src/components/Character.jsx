import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from './config';


function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const characterUrl = `${API_URL}/characters/${id}`;
      const characterRes = await fetch(characterUrl);
      let characterData = await characterRes.json();

      const homeworldRes = await fetch(`${API_URL}/planets/${characterData.homeworld}`);
      characterData.homeworld = await homeworldRes.json();

      const filmsRes = await fetch(`${API_URL}/characters/${characterData.id}/films`);
      characterData.films = await filmsRes.json();

      setCharacter(characterData);
      setLoading(false);
    };

    fetchCharacter().catch(console.error);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 id="name">{character.name}</h1>
      <span id="birth_year">Born: {character.birth_year}</span><br />
      <span id="height">Height: {character.height}</span><br />
      <span id="mass">Mass: {character.mass}</span><br />
      <br/><div id="homeworld">
        Homeworld: <a href={`/planet/${character.homeworld.id}`}>{character.homeworld.name}</a>
      </div>
      <div id="films">
        <h2>Films</h2>
        <ul>
          {character.films.map(film => (
            <li key={film.id}><a href={`/film/${film.id}`}>{film.title}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Character;