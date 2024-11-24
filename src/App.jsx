import React, { useEffect, useState } from 'react';
import { Button } from './components/Button';
import './sass/App.scss';
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import { Card } from "./components/Card";
import { DiVisualstudio } from 'react-icons/di';

const App = () => {
  const [pokemonId, setPokemonId] = useState(60);
  const [pokemonEvolution, setPokemonEvolution] = useState([]);

  // Ejecutar `getEvolution` cada vez que cambie `pokemonId`
  useEffect(() => {
    getEvolution(pokemonId);
  }, [pokemonId]);

  // Función para obtener la cadena de evolución
  async function getEvolution(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
      const data = await response.json();

      const pokemonEvoArray = [];

      // Obtener el nombre e imagen del Pokémon de nivel 1
      const pokemonLv1 = data.chain.species.name;
      const pokemonLv1Img = await getPokemonImgs(pokemonLv1);
      pokemonEvoArray.push({ name: pokemonLv1, image: pokemonLv1Img });

      // Verificar si hay evolución de nivel 2
      if (data.chain.evolves_to.length !== 0) {
        const pokemonLv2 = data.chain.evolves_to[0].species.name;
        const pokemonLv2Img = await getPokemonImgs(pokemonLv2);
        pokemonEvoArray.push({ name: pokemonLv2, image: pokemonLv2Img });

        // Verificar si hay evolución de nivel 3
        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
          const pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
          const pokemonLv3Img = await getPokemonImgs(pokemonLv3);
          pokemonEvoArray.push({ name: pokemonLv3, image: pokemonLv3Img });
        }
      }

      // Actualizar el estado con la cadena de evolución
      setPokemonEvolution(pokemonEvoArray);
      console.log("Evolución del Pokémon:", pokemonEvoArray);
    } catch (error) {
      console.error("Error al obtener la cadena de evolución:", error);
    }
  }

  // Función para obtener la imagen del Pokémon
  async function getPokemonImgs(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      const data = await response.json();

      // Obtener la URL de la imagen oficial del Pokémon
      return data.sprites.other['official-artwork'].front_default;
    } catch (error) {
      console.error("Error al obtener la imagen del Pokémon:", error);
      return "";
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className={`card-container card-${pokemonEvolution.length}`}>
          {/* Mostrar la lista de Pokémon en la cadena de evolución */}
          {pokemonEvolution.map((pokemon, index) => (
            <Card
              key={index}
              icon={<DiVisualstudio />}
              name={pokemon.name}
              imageUrl={pokemon.image}
            />
          ))}
        </div>
        <div className="buttons-container">
          <Button
            icon={<TiArrowBackOutline />}
            handleClick={() => {
              if (pokemonId > 1) {
                setPokemonId(pokemonId - 1);
              }
            }}
          />
          <span>{pokemonId}</span>
          <Button
            icon={<TiArrowForwardOutline />}
            handleClick={() => setPokemonId(pokemonId + 1)}
          />
        </div>
      </header>
    </div>
  );
}

export { App };
