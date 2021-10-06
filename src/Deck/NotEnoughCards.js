import React from "react";
import { Link } from "react-router-dom";

//notenoughcard component tells user to add cards

const NotEnoughCards = ({ deck }) => {
  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-2">
        <span className="oi oi-plus"></span> Add Cards
      </Link>
    </div>
  );
};

export default NotEnoughCards;
