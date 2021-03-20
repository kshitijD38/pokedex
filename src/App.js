import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonData from "./components/PokemonData/PokemonData";
// import ReactDOM from "react-dom";

function App() {
  const [state, setState] = useState({ items: [], isLoaded: false });
  const [offset, setOffset] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    setState({ isLoaded: false, items: [] });

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setState((prev) => {
          return { ...prev, isLoaded: true, items: json.results };
        });
      })
      .catch(() => {
        setState({ isLoaded: false, items: [] });
      });
  }, [offset]);

  const handleNext = () => {
    setOffset(offset + 15);
  };

  // console.log(offset);

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - 15);
    }
  };

  const home = () => {
    setOffset(0);
  };

  // console.log("  ---", id);

  // console.log(state.items);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/details">
            <div className="bar_Data">
              <Link to="/">
                <img
                  className="img1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </Link>
              <div className="data-title">
                <strong>Pokemon Data</strong>
              </div>
              <div className="extra1"></div>
            </div>
            <PokemonData id={id} />
          </Route>
          <Route path="/">
            <div className="bar_List">
              <Link to="/">
                <img
                  onClick={home}
                  className="img1"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAACcCAMAAAA9MFJFAAAAq1BMVEX/////sADikAD/qwDhigD/rgD/qgD/6cz/7tnghgD/vlDgiADwyZ7ijgD12r/z1bbmoUb238jwz6z78OTjkhH/69D/ukPtvYj/+vL/9ur/pQD/ti//3a7/26foqVn/4bf/ynr/x3D/5cL/xWj/0Ir/z4jfgQD/1pr/vEj/uDjrt3v/473/shn/xm345tT/1JTuwpH/wl3lnj3prmbkmS7ln0DprGLtv4rxzKV1hVCpAAAKKklEQVR4nO2dD1uqPhuAERhKtso8JJb8REstM6vTOW/n+3+ydzAGYxt/RAaJu69zHVMHsruxPTwbpmkKhUKhUCgUCoVCoVAoFAqFQlE7U2c5n3meN5svnWnbB3NqOJ5/Z1hGAAAgfLSMO99z2j6w02C5erACcT2WQKb1sFq2fYA/G3d2Eejj7NEeDeti5rZ9oD+V18Bfjr5YI7L42vbB/kDcd1DKH7EI3lVTTDFdWOX9RRathRqmY9zDBUYSVUvEPFUSiCU+tX3wP4HX3BG4UCI4+4HFvbCOEBhgXZz32Tw/YBTObIjGvO1qtMjjsU0QYz22XZG2mO6Ob4IYsDvP+KZfeSAWOLT6bVenBbx6TmKC5bVdocZZ1WsQOVy1XaWG8Y2aDfZ6ht92pRplUb9B5HDRdrUaREIbDB36bVesMZ7kGEQOz+WSeVb3SJJgzdquXCM48gwih+cwQ+XKOosxxhkkHR7quyYRAR7arqB0fLkGkUO/7SpKpi+zI8R0/XJZdhsMAG1XUipvjSh8a7uaEknFM3itTAGVlHc5sqFyrMBaLft9B9HHOOE/lk2VySmwa7ui0vCokBCEeearj8sxetijJyP0MBZsdFfBodHZ5CFl0AiGzTE0oWl/afv1Wvuzvp2iBwFVxnCj4Zo1xTvdntBz14Q6wpxo5o02We81/Y9os22Fyxnw3nDdGoI+jS/Q8w9TD7Hzr8kuTRCsLQSiNYdn1gw3lIFQ4Q3ECs1R7naXJnz+vLh4vnt56ZVbPRd8wKaZSjULXfnDFFIFnCdQ7rzuYnw9p6t+2IlsXtHPZ6VO6C4ucXjhWqE2JMNJLqxCTfss0RDBi6yKYFxtIPcDeAap2AQrREGNadrbgi15hdqqhENLFGTWhfvwsrpv+hroKXX2YYVxaJ2LQGGZWWggcR5lEIYHRsOrUNL9F1FYBpHCMkvC5A0o0UIM0GwzHKRPvcMUDnmFKFA38m+v6BmyOqs3bNBoeHHo0zGtUKhQ0/qrF8vKzunIOpPnURtserZwJ1Q4yiXqajIVBkwHUXrH8dg2KStf44WfA0DDI7LLdP9YIRzmssbmchXSn8EO05aUyTznPjyL72TsO4+5IVD4Lwqts4A464AU5l++ED6YD5EUXW8ssLN8KbvOg523CxVeFin8FW5bWuE1ZD7El1SZ6aCFfCQ7eVxF4f42E/wh16ae/pBOTSmzkfBhCnFcaJtZ2NdhQaQw7dCiD4GdUqBHg2X0Guk8XVKI2g4NbgN+YsKhCqd3K5jFoAovqT2X6rIHbE9fRWF2aTNRmHJIR4bT+/S8lkVP80Xv3ZN7nQfkhWnyHupYny2DpYdM0Hu2Psk+H7jCFjorlmR3yCb5sdS8NzuaSFRIO6THkykbE/jU8UXvGaQy5FduTZP3UCB9wceeyIqTSkHF92/wcz4AjeJLsuckSjFKXeS8s7uTqJBySKf/OYXP3gYfu7chyWDgexv3SIUv3qYvQ+GiSYWJQ0CtHGYVotg4ukmgl1zYAHA/PU5hsNt3GQqfG1UYOwTPlEKqxyJvY4VhtACiK0Qr3QrdSCEI+0KiMFlEYPVYhfGcwx1fGPeFIFIY77lUX8jd5iRXIXGYusRzBjGUws3nGz6ewSDsbcDn42eiED17DF/1B44bKwSPya4GAoV3j59OrBAsUoVdZxDGyOAx2vNTuOdiuOyeZIV69CuzxIdD2gdS+IYbRTAKzEIVABhUBBHNGkadKlHop/bGKgzO5WWikEt2bAC957JBeuMK9VyFVCtckIZFFIZ5xnQQBqz7VUph+iah/r0VE21hUAq5Ge33+/jOObTnkjONbJKhAYXYIZVomCZWdocpTBJz8XAS7YGfrCYjxJIaTgSFH8lJXs5fSwp1ViF/DEZlhdHKAL6RCxQCQeG2FJa6wEs7zFO4e9jNyip03ZTC3QOmF1UvweAVMoWD4tpn9KlvZM8NKdxfZ6KJFOq5CqMxod6+kGz2U/vCQliFOn0HRawwOq+iG/ZOZURuS6FO9T9EIXj0MfjYPd/fhcfjOOH0Dlj4CyouXPg4ils4QaYmjgsdOvnCxYXP/mJAxYVOOlPj4D36fngCgJVTLlPTlsIhr9Dg5q13R1ydGI1dnXCLD1pUyM0a0dfIxvHXyIaca+RaLvAOVxjtoEDhbOaRBrOaecdmau5m0RdV1qyQ+2y8smsoW+FNGYXaSeQLxcku7TeUrJBa8UQyNfcihZWz1haXtY7j8Jqz1huxwgKHRys0L6l3SbZENP6x77lJaoV+byCAKhwyZveZUbjgiDhehYn/IofHKyy33Ukgnn4K+JvjMJ6K51WMrwLG8WMIp3Aoc4lh0wgnQUP+2lnrQWx7H5YQKdTtAFP7Ez7a+EVOod1Q7RqBHZ6olV3jTKICIoXX24Bb7Qr9P9kmU/HpVvy7iao1xUqscPK/6+JtC/tC0h1zCgsWcZ8WS/YiCAc1JrTFDj++PuKfCxTu19EKME5hl0aTjMVxro1ayn/C8muY3I5XoHBiwi/8E6uw4GaMU+MFCFqhDXVTvN7fpoaCAoVjGA07rMJudYVccI0VXtm26MbF0Whk6ib6Hz+tGhemAusOMLYECtHLgqJX62HgwkxWuVZTaHcpKgxIJ2vo5eqX20nMFnVf1zYM4m1IhpqKCuk0TTfYZCpcwwQbhXju19cW6nD79YWHg3juJAnC19d0TE56g7TCrp3H7JhMK7Tpet+S1/jhhDIEv1ObCa9OOjYeB6SSbfIVZkRLJ81SPL0tVqjbevx+NYUll7ifFvSAktUXDm/57WKFdlJsktosCsNphd0bTAJmhljh9j8KQSBCFLrJwD1BxW6TZ4I0gyn4XXQAuhUecD/DNzw8qIGw4jH+cOhmaJW/l/cXNEvkcxC3Ztcboab1qO+bKn0P27dZdnS9gd3uCQPoKRTwUGrIHH8FTWv4XaLoJGmE5e57PElSyWvLLgH+BgzdhDdFmMksDPzbdkXlkV6hBvQDgEVQZTuXYKB5Nyo7LI/5UXwgJwyTsJFhsLtjCYbNG0pQ2OnTOGBjSHbYvSQXB7M8qm6HXczQcLBfFlKvwY53hBhu7X2dCjvfEWLYPzVRo0MyH9p55rIcZqyN6CLsH3CryaH9r+2KNchGhkO7++EMjYR2eFZtMIDrD/OXrpcweD79IMGx6owPod3FGbsipr36HEL9POJBjou6rpfNc7iqE7Ox6sh9wTMbitMMasgfmr/O9CQmrFIN8XCH0O7UovRKjF/ob7IF+kHBDRz+PvMmiJnTf/ngEIfQhOcXDGbgAeq26rIOoXkGCeoDoCSWc4ha4Lld0BXyekcGlmKHENq/1SksYPwE8HfO5zuEcAi/1SCShbPaBX+bKNMhhKb9a3IuqemqTGeLnmUwSzzCBSGmaetft6r9lcLte9sb3baHw/A7uYJ7k/Wb7b9R9xbxy8Yd7/ej0Wi/Hyt3CoVCoVAoFAqFQqFQKBQKhUKhULTC/wHUE+RXriYN7wAAAABJRU5ErkJggg=="
                  alt=""
                />
              </Link>
              <div className="list-title">
                <strong>Pokemon List</strong>
              </div>
              <div className="extra"></div>
            </div>
            <PokemonList
              offset={offset}
              isLoaded={state.isLoaded}
              list={state.items}
              id={id}
              setId={setId}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
