import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Planet() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const planetResponse = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}`);
        if (!planetResponse.ok) {
          throw new Error('Planet not found');
        }
        const planetData = await planetResponse.json();
        setPlanet(planetData);

        const charactersResponse = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}/characters`);
        const charactersData = await charactersResponse.json();
        setCharacters(charactersData);

        const filmsResponse = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}/films`);
        const filmsData = await filmsResponse.json();
        setFilms(filmsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div id="planet">
        <h1>{planet?.name}</h1>
      </div>
      <div id="characters">
        <h2>Characters</h2>
        {characters.map(character => (
          <p key={character.id}><a href={`/character/${character.id}`}>{character.name}</a></p>
        ))}
      </div>
      <div id="films">
        <h2>Films</h2>
        {films.map(film => (
          <p key={film.id}><a href={`/film/${film.id}`}>{film.title}</a></p>
        ))}
      </div>
    </div>
  );
}

export default Planet;