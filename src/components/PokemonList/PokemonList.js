import React from "react";
import { Link } from "react-router-dom";
import "./PokemonList.css";

const PokemonList = ({
  offset,
  isLoaded,
  list,
  id,
  setId,
  handleNext,
  handlePrev,
}) => {
  console.log(id);
  console.log(offset);
  console.log(list[0]);

  if (!isLoaded) {
    return "Loading...";
  }
  return (
    <div className="lists">
      <ul>
        {list.map((item, index) => (
          <Link to="/details" key={index + offset}>
            <div className="list-container">
              <h2
                className="list"
                onClick={() => {
                  setId(index + offset);
                }}
              >
                {item.name}
              </h2>
            </div>
          </Link>
          // </a>
        ))}
      </ul>
      <div className="nav-button">
        <button className="button-page" onClick={handlePrev}>
          Prev
        </button>
        <button className="button-page" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
