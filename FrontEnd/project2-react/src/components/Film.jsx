import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from './config';

function FilmPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/films/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Film not found');
        }
        return response.json();
      })
      .then(film => {
        setFilm(film);
        return Promise.all([
          fetch(`${API_URL}/films/${id}/characters`).then(res => res.json()),
          fetch(`${API_URL}/films/${id}/planets`).then(res => res.json())
        ]);
      })
      .then(([charactersData, planetsData]) => {
        setCharacters(charactersData);
        setPlanets(planetsData);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!film) return <div>Loading...</div>;

  return (
    <div>
      <div id="film">
        <h1>{film.title}</h1>
      </div>
      <div id="characters">
        <h2>Characters</h2>
        {characters.map(character => (
          <p key={character.id}><a href={`/character/${character.id}`}>{character.name}</a></p>
        ))}
      </div>
      <div id="planets">
        <h2>Planets</h2>
        {planets.map(planet => (
          <p key={planet.id}><a href={`/planet/${planet.id}`}>{planet.name}</a></p>
        ))}
      </div>
    </div>
  );
}

export default FilmPage;