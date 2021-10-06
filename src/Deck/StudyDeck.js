import React from "react";
import { Link } from "react-router-dom";
import EnoughCards from "./EnoughCards";
import NotEnoughCards from "./NotEnoughCards";

//studydeck component renders study page based on deck data from viewdeck component.

const StudyDeck = ({ deck }) => {
  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb w-50">
          <li className="breadcrumb-item" key="1">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" key="2">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="3">
            Study
          </li>
        </ol>
      </nav>

      <div>
        <h2>{deck.name}: Study</h2>
      </div>
      <div>
        {deck.cards.length < 3 ? (
          <NotEnoughCards deck={deck} />
        ) : (
          <EnoughCards deck={deck} />
        )}
      </div>
    </section>
  );
};

export default StudyDeck;
