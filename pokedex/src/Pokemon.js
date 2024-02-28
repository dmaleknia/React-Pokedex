import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css'; // Ensure the file name matches

const Pokemon = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const { data: pokemonResponse } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(pokemonResponse);

        const { data: speciesResponse } = await axios.get(pokemonResponse.species.url);
        const { data: evolutionChainResponse } = await axios.get(speciesResponse.evolution_chain.url);
        
        const evolutions = extractEvolutions(evolutionChainResponse.chain);
        setEvolutionChain(evolutions.length > 1 || evolutions[0] !== pokemonName ? evolutions : ["None"]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  const extractEvolutions = (chain, evolutions = []) => {
    evolutions.push(chain.species.name);
    chain.evolves_to.forEach(evolvesToChain => extractEvolutions(evolvesToChain, evolutions));
    return evolutions;
  };

  if (loading) return <div className="Pokemon">Loading...</div>;

  return (
    <div className="Pokemon">
      {pokemonData && (
        <>
          <h2>{pokemonData.name.toUpperCase()} (ID: {pokemonData.id})</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />

          {/* Basic Info */}
          <div className="info-group">
            <p>Type: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
            <p>Weight: {pokemonData.weight} hectograms</p>
            <p>Height: {pokemonData.height} decimetres</p>
          </div>

          {/* Abilities */}
          <div className="info-group">
            <h3>Abilities:</h3>
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name} (Hidden: {ability.is_hidden ? 'Yes' : 'No'})</li>
              ))}
            </ul>
          </div>

          {/* Base Stats */}
          <div className="info-group">
            <h3>Base Stats:</h3>
            <ul>
              {pokemonData.stats.map((stat, index) => (
                <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
          </div>

          {/* Game Appearances */}
          <div className="info-group">
            <h3>Game Appearances:</h3>
            <ul>
              {pokemonData.game_indices.map((game, index) => (
                <li key={index}>{game.version.name}</li>
              ))}
            </ul>
          </div>

          {/* Held Items */}
          <div className="info-group">
            <h3>Held Items:</h3>
            <ul>
              {pokemonData.held_items.length > 0 ? pokemonData.held_items.map((item, index) => (
                <li key={index}>{item.item.name}</li>
              )) : <li>None</li>}
            </ul>
          </div>

          {/* Evolution Chain */}
          <div className="info-group">
            <h3>Evolution Chain:</h3>
            <ul>
              {evolutionChain.map((evolution, index) => (
                <li key={index}>{evolution}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
