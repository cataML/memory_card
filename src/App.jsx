import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card.jsx";

function App() {

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {

    async function fetchPokemon() {

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=12"
      );

      const data = await response.json();

      const detailedPokemon =
        await Promise.all(

          data.results.map(async (pokemon) => {

            const res = await fetch(pokemon.url);

            return res.json();

          })

        );

      setCards(detailedPokemon);
    }

    fetchPokemon();

  }, []);

  function shuffleCards(array) {

    return [...array].sort(
      () => Math.random() - 0.5
    );
  }

  function handleClick(name) {

    if (clickedCards.includes(name)) {

      alert("Game Over!");

      setScore(0);
      setClickedCards([]);

    } else {

      const updatedClicked =
        [...clickedCards, name];

      setClickedCards(updatedClicked);

      const newScore = score + 1;

      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

    }

    setCards(shuffleCards(cards));
  }

  return (

    <div className="container">

      <h1>Memory Game</h1>

      <div className="scoreboard">

        <h2>Score: {score}</h2>

        <h2>Best Score: {bestScore}</h2>

      </div>
      <h4>Click a card to earn points</h4>

      <div className="cards-container">

        {cards.map((card) => (

          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
          />

        ))}

      </div>

    </div>
  );
}

export default App;