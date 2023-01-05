import React from "react";
import "./card.css"

const handleClick = () => {};

const Card = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    };


  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/babalon.jpeg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default Card;
