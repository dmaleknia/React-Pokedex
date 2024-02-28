import './App.css';
import React, { useState } from 'react';
import Pokemon from './Pokemon';
import PokemonSearch from './PokemonSearch';

function App() {
  const [pokemonName, setPokemonName] = useState('pikachu');

  const handlePokemonSearch = (pokemonName) => {
    setPokemonName(pokemonName);
  };

  return (
    <div className="App">
      <PokemonSearch onPokemonSearch={handlePokemonSearch} />
      <Pokemon pokemonName={pokemonName} />
    </div>
  );
}

export default App;
