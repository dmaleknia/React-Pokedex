import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch = ({ onPokemonSearch }) => {
  const [pokemonName, setPokemonName] = useState('');

  const handleChange = event => {
    setPokemonName(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onPokemonSearch(pokemonName);
    }
  };

  return (
    <div>
      <input type="text" value={pokemonName} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
};
export default PokemonSearch;
