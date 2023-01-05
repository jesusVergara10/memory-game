import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card";

const cardImages = [
  { src: "/img/6759647_preview.png", mattched: false},
  { src: "/img/alchemy.jpeg", mattched: false},
  { src: "/img/ancient-egyptian-moon-sign-left-260nw-512588395.webp", mattched: false},
  { src: "/img/DMO+Ritual.jpeg", mattched: false},
  { src: "/img/hand.jpeg", mattched: false},
  {
    src: "/img/imgbin-alchemy-symbol-art-occult-symbol-x4JZfJB4nmsygitQ7fQqm836V.jpeg",mattched: false},
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, SetTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  //Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    SetTurns(0);
  };

  //handle a choice 
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare cards 
  useEffect(()=>{
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, mattched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else {
        setTimeout(()=>resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn 
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    SetTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //start Automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magick Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.mattched}
            disabled={disabled}
            />
        ))}
      </div>
          <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
