import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokemon = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch basic Pokemon data
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(pokemonResponse.data);

        // Fetch species data to get evolution chain URL
        const speciesResponse = await axios.get(pokemonResponse.data.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        // Fetch evolution chain data
        const evolutionChainResponse = await axios.get(evolutionChainUrl);
        const evolutions = extractEvolutions(evolutionChainResponse.data.chain);
        setEvolutions(evolutions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  // Extract evolution names recursively
  const extractEvolutions = (chain, evolutions = []) => {
    evolutions.push(chain.species.name);
    chain.evolves_to.forEach(evolvesToChain => extractEvolutions(evolvesToChain, evolutions));
    return evolutions;
  };

  if (!pokemonData) return <div>Loading...</div>;

  // Check if the Pokémon does not evolve or only fetches itself
  const displayEvolutions = evolutions.length === 1 && evolutions[0] === pokemonName ? ["None"] : evolutions;

  return (
    <div>
      <h2>{pokemonData.name} (ID: {pokemonData.id})</h2>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Type: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
      <p>Weight: {pokemonData.weight} hectograms</p>
      <div>
        <h3>Base Stats:</h3>
        <ul>
          {pokemonData.stats.map(stat => (
            <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Moves:</h3>
        <ul>
          {pokemonData.moves.map(move => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Evolution Chain:</h3>
        <ul>
          {displayEvolutions.map(evolution => (
            <li key={evolution}>{evolution}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pokemon;
