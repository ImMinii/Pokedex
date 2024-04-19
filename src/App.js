import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './Component/Pokedex';
import PokemonDetails from './Component/PokemonDetails';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Pokedex />} />
                    <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
