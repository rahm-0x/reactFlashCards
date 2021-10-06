import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//enoughcard component uses deck data and flip state var controlled by useState hook

export default function EnoughCards({ deck }) {
  const [flip, setFlip] = useState(false);
  const [cardId, setCardId] = useState(0);
  const history = useHistory();
  const cards = deck.cards;

  const flipHandler = () => {
    setFlip(!flip);
  };

  const nextBtnHandler = () => {
    setCardId(cardId + 1);
    setFlip(!flip);
    if (cardId === cards.length - 1 && flip === true) {
      const result = window.confirm(
        "\nRestart cards? \n\nClick 'cancel' to return to the home page. "
      );
      return result ? setCardId(0) : history.push("/");
    }
  };

  return (
    <div className="card w-50" key={cards[cardId].id}>
      <div className="card-body">
        <h5 className="card-title">
          Card {cardId + 1} of {cards.length}
        </h5>
        <div className="row w-75">
          {flip === false ? (
            <p className="col card-text">{cards[cardId].front}</p>
          ) : (
            <p className="col card-text">{cards[cardId].back}</p>
          )}
        </div>
        <div className="pt-3">
          <button
            className="btn btn-secondary mr-2 "
            onClick={() => flipHandler()}
          >
            Flip
          </button>
          {flip === true ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => nextBtnHandler()}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
