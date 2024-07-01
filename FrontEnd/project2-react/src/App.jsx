import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from "./components/CharacterList";
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from './components/Planet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/planet/:id" element={<Planet />} />
      </Routes>
    </Router>
  );
}

export default App;