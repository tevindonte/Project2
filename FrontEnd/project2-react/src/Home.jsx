import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from "./components/CharacterList";
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from './components/Planet';
import PlanetList from './components/PlanetList'
import FilmsList from './components/FilmsList';
import DotRing from './Ring/DotRing'
import { MouseContext } from "./context/mouse-context";
import './Home.css'

function Home() {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);

    
  return (
    <div id="page">
    <h1 id="titlemain">Star Wars Wikipedia</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/NaVnlWw5DAE?si=QTbkEM_Aa700xDAq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <DotRing />
        <CharacterList />
        <PlanetList />
        <FilmsList />
    
    </div>
  );
}

export default Home;