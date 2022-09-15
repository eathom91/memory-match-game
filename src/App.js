import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// card array
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  };
// runs once, then only if dep. arr value changes
useEffect(() => {
  
  // two choices need to have been made
  if (choiceOne && choiceTwo){
    setDisabled(true);
    // if both choices match
    if (choiceOne.src === choiceTwo.src){
      // call state update for cards iterating over current state value
      // matching the choiceOne and choicetwo based on src.
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            // spreads out the current card obj values, and sets match
            // to true.
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      // timeout by 3/4 sec
      setTimeout(() => resetTurn(), 750)
    } else {
      // timeout by 3/4 sec
      setTimeout(() => resetTurn(), 750)
    } 
  }
}, [choiceOne, choiceTwo])

console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // useEffect to auto-start the game
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          // on component re-eval, check if card is chosen, or matched prior
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;