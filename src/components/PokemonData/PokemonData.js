// import React from "react";
import React, { useEffect, useState } from "react";
import "./PokemonData.css";

const PokemonData = ({ id }) => {
  const [pokeData, setPokedata] = useState({});
  const info = `https://pokeapi.co/api/v2/pokemon/${id + 1}`;

  useEffect(() => {
    // setPokedata({ isLoaded: false, items: [] });

    // fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`)
    fetch(info)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPokedata(json);
      });
  }, []);

  //   console.log(pokeData.height);
  //   console.log(pokeData.weight);
  //   console.log(pokeData.abilities);
  //   console.log(pokeData.moves);
  // console.log(pokeData.sprites.front_default);
  const t = false;
  if (
    t ||
    pokeData.sprites === undefined ||
    pokeData.abilities[0] === undefined ||
    pokeData.moves[0] === undefined
  ) {
    return (
      <div className="screen-empty">
        <div className="pokemonData-empty">
          <h4 className="text-empty">Loading...</h4>
        </div>
      </div>
    );
  }
  return (
    <div className="screen">
      <div className="pokemonData">
        <div className="image-div">
          <img className="image" src={pokeData.sprites.front_default} />
        </div>
        <h4 className="abilities">
          <span>
            <strong>Abilities: </strong>
          </span>
          <span>
            {pokeData.abilities.map((temp, index) => (
              <ol className="ability">{temp.ability.name} </ol>
            ))}
          </span>
        </h4>
        <h4 className="height">
          Heigth: <span className="-height">{pokeData.height}</span>
        </h4>
        <h4 className="weight">
          Weight: <span className="-weight">{pokeData.weight}</span>
        </h4>
        <h4 className="moves">
          <span>Moves: </span>
          <span>
            {pokeData.moves.map((temp, index) =>
              index > 3 ? null : <ol className="move">{temp.move.name} </ol>
            )}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default PokemonData;
