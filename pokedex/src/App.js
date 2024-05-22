import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RetryImage from './RetryImage';

const excludedForms = [
  'deoxys-speed', 'wormadam-sandy', 'wormadam-trash', 'shaymin-sky', 
  'giratina-origin', 'rotom-heat', 'rotom-wash', 'rotom-frost', 'rotom-fan', 
  'rotom-mow', 'castform-sunny', 'castform-rainy', 'castform-snowy', 
  'basculin-blue-striped', 'darmanitan-zen', 'meloetta-pirouette', 
  'tornadus-therian', 'thundurus-therian', 'landorus-therian', 'kyurem-black', 
  'kyurem-white', 'keldeo-resolute', 'meowstic-female', 'aegislash-blade',
   'deoxys-attack', 'deoxys-defense', 'pumpkaboo-small', 
  'pumpkaboo-large', 'pumpkaboo-super', 'gourgeist-small', 'gourgeist-large', 
  'gourgeist-super', 'venusaur-mega', 'charizard-mega-x', 'charizard-mega-y',
  'blastoise-mega', 'alakazam-mega', 'gengar-mega', 'kangaskhan-mega', 
  'pinsir-mega', 'gyarados-mega', 'aerodactyl-mega', 'mewtwo-mega-x', 
  'mewtwo-mega-y', 'ampharos-mega', 'scizor-mega', 'heracross-mega', 
  'houndoom-mega', 'tyranitar-mega', 'blaziken-mega', 'gardevoir-mega', 
  'mawile-mega', 'aggron-mega', 'medicham-mega', 'manectric-mega', 
  'banette-mega', 'absol-mega', 'garchomp-mega', 'lucario-mega', 
  'abomasnow-mega', 'floette-eternal', 'latias-mega', 'latios-mega', 
  'swampert-mega', 'sceptile-mega', 'sableye-mega', 'altaria-mega', 
  'gallade-mega', 'audino-mega', 'sharpedo-mega', 'slowbro-mega', 
  'steelix-mega', 'pidgeot-mega', 'glalie-mega', 'diancie-mega', 
  'metagross-mega', 'kyogre-primal', 'groudon-primal', 'rayquaza-mega', 
  'pikachu-rock-star', 'pikachu-belle', 'pikachu-pop-star', 'pikachu-phd', 
  'pikachu-libre', 'pikachu-cosplay', 'hoopa-unbound', 'camerupt-mega', 
  'lopunny-mega', 'salamence-mega', 'beedrill-mega', 'rattata-alola', 
  'raticate-alola', 'raticate-totem-alola', 'pikachu-original-cap', 
  'pikachu-hoenn-cap', 'pikachu-sinnoh-cap', 'pikachu-unova-cap', 
  'pikachu-kalos-cap', 'pikachu-alola-cap', 'raichu-alola', 'sandshrew-alola', 
  'sandslash-alola', 'vulpix-alola', 'ninetales-alola', 'diglett-alola', 
  'dugtrio-alola', 'meowth-alola', 'persian-alola', 'geodude-alola', 
  'graveler-alola', 'golem-alola', 'grimer-alola', 'muk-alola', 
  'exeggutor-alola', 'marowak-alola', 'greninja-battle-bond', 'greninja-ash', 
  'zygarde-10-power-construct', 'zygarde-50-power-construct', 'zygarde-complete', 
  'gumshoos-totem', 'vikavolt-totem', 'oricorio-pom-pom', 'oricorio-pau', 
  'oricorio-sensu', 'lycanroc-midnight', 'wishiwashi-school', 'lurantis-totem', 
  'salazzle-totem', 'minior-orange-meteor', 'minior-yellow-meteor', 
  'minior-green-meteor', 'minior-blue-meteor', 'minior-indigo-meteor', 
  'minior-violet-meteor', 'minior-red', 'minior-orange', 'minior-yellow', 
  'minior-green', 'minior-blue', 'minior-indigo', 'minior-violet', 
  'mimikyu-busted', 'mimikyu-totem-disguised', 'mimikyu-totem-busted', 
  'kommo-o-totem', 'magearna-original', 'pikachu-partner-cap', 'marowak-totem', 
  'ribombee-totem', 'rockruff-own-tempo', 'lycanroc-dusk', 'araquanid-totem', 
  'togedemaru-totem', 'necrozma-dusk', 'necrozma-dawn', 'necrozma-ultra', 
  'pikachu-starter', 'eevee-starter', 'pikachu-world-cap', 'meowth-galar', 
  'ponyta-galar', 'rapidash-galar', 'slowpoke-galar', 'slowbro-galar', 
  'farfetchd-galar', 'weezing-galar', 'mr-mime-galar', 'articuno-galar', 
  'zapdos-galar', 'moltres-galar', 'slowking-galar', 'corsola-galar', 
  'zigzagoon-galar', 'linoone-galar', 'darumaka-galar', 'darmanitan-galar-standard', 
  'darmanitan-galar-zen', 'yamask-galar', 'stunfisk-galar', 'zygarde-10', 
  'cramorant-gulping', 'cramorant-gorging', 'toxtricity-low-key', 'eiscue-noice', 
  'indeedee-female', 'morpeko-hangry', 'zacian-crowned', 'zamazenta-crowned', 
  'eternatus-eternamax', 'urshifu-rapid-strike', 'zarude-dada', 'calyrex-ice', 
  'calyrex-shadow', 'venusaur-gmax', 'charizard-gmax', 'blastoise-gmax', 
  'butterfree-gmax', 'pikachu-gmax', 'meowth-gmax', 'machamp-gmax', 
  'gengar-gmax', 'kingler-gmax', 'lapras-gmax', 'eevee-gmax', 
  'snorlax-gmax', 'garbodor-gmax', 'melmetal-gmax', 'rillaboom-gmax', 
  'cinderace-gmax', 'inteleon-gmax', 'corviknight-gmax', 'orbeetle-gmax', 
  'drednaw-gmax', 'coalossal-gmax', 'flapple-gmax', 'appletun-gmax', 
  'sandaconda-gmax', 'toxtricity-amped-gmax', 'centiskorch-gmax', 
  'hatterene-gmax', 'grimmsnarl-gmax', 'alcremie-gmax', 'copperajah-gmax', 
  'duraludon-gmax', 'urshifu-single-strike-gmax', 'urshifu-rapid-strike-gmax', 
  'toxtricity-low-key-gmax', 'growlithe-hisui', 'arcanine-hisui', 'voltorb-hisui', 
  'electrode-hisui', 'typhlosion-hisui', 'qwilfish-hisui', 'sneasel-hisui', 
  'samurott-hisui', 'lilligant-hisui', 'zorua-hisui', 'zoroark-hisui', 
  'braviary-hisui', 'sliggoo-hisui', 'goodra-hisui', 'avalugg-hisui', 
  'decidueye-hisui', 'dialga-origin', 'palkia-origin', 'basculin-white-striped', 
  'basculegion-female', 'enamorus-therian', 'tauros-paldea-combat-breed', 
  'tauros-paldea-blaze-breed', 'tauros-paldea-aqua-breed', 'wooper-paldea', 
  'oinkologne-female', 'dudunsparce-three-segment', 'palafin-hero', 
  'maushold-family-of-three', 'tatsugiri-droopy', 'tatsugiri-stretchy', 
  'squawkabilly-blue-plumage', 'squawkabilly-yellow-plumage', 
  'squawkabilly-white-plumage', 'gimmighoul-roaming', 'koraidon-limited-build', 
  'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 
  'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 
  'miraidon-glide-mode', 'ursaluna-bloodmoon', 'ogerpon-wellspring-mask', 
  'ogerpon-hearthflame-mask', 'ogerpon-cornerstone-mask', 'terapagos-terastal', 
  'terapagos-stellar'
];

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 50; // Number of Pokémon to fetch per batch

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonData = response.data.results;

      const pokemonWithTypes = await Promise.all(pokemonData.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          ...pokemon,
          types: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name)
        };
      }));

      setPokemonList(prevList => [...prevList, ...pokemonWithTypes]);
      setOffset(prevOffset => prevOffset + limit);
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.error('There was an error!', error);
    }
    setLoading(false);
  }, [offset]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loading) {
        if (!pokemonList.some(pokemon => pokemon.name === 'pecharunt')) {
          fetchPokemon();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, fetchPokemon, pokemonList]);

  if (error) return <div>Error: {error}</div>;

  const getTypeColor = (type) => {
    const typeColors = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      normal: '#A8A878',
      ground: '#E0C068',
      flying: '#A890F0',
      bug: '#A8B820',
      poison: '#A040A0',
      fighting: '#C03028',
      rock: '#B8A038',
      ghost: '#705898',
      steel: '#B8B8D0'
    };
    return typeColors[type] || '#777'; // default color if type not found
  };

  return (
    <div className="App">
      {pokemonList.filter(pokemon => !excludedForms.includes(pokemon.name)).map((pokemon, index) => (
        <div key={index}>
          <RetryImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <div>
            {pokemon.types.map((type, typeIndex) => (
              <div key={typeIndex} style={{ backgroundColor: getTypeColor(type), color: 'white', padding: '2px 5px', display: 'inline-block', marginRight: '5px' }}>
                {type}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
