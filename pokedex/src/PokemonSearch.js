import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonSearch = ({ onPokemonSearch }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = event => {
    setPokemonName(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onPokemonSearch(pokemonName);
    }
  };

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const { data: pokemonListResponse } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const pokemonNames = pokemonListResponse.results.map(pokemon => pokemon.name);
        const filteredPokemonNames = pokemonNames.filter(name => name.startsWith(pokemonName.toLowerCase()));
        setSuggestions(filteredPokemonNames);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPokemonNames();
  }, [pokemonName]);

  const mostLikelySuggestion = suggestions[0] || '';

  return (
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ color: 'grey' }}
      />
      {suggestions.length > 0 && (
        <div style={{ color: 'grey' }}>
          {mostLikelySuggestion}
        </div>
      )}
    </div>
  );
};
export default PokemonSearch;
