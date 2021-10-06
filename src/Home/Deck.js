import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

//renders the deck and all the functions that you can do within a deck such as delete or edit.

export default function Deck({ deck, setDlt }) {
  const deleteHandler = async (event) => {
    const result = window.confirm(
      "\nDelete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
      const aC = new AbortController();
      await deleteDeck(deck.id, aC.signal);
      setDlt(true);
    }
  };

  return (
    <div className="card w-50 mb-3">
      <div className="card-body">
        <h5 className="card-title d-flex mr-1">
          {deck.name}{" "}
          <span className="ml-auto font-weight-light">
            {deck.cards.length} cards
          </span>
        </h5>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2 ">
            <span className="oi oi-eye"></span>View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
            <span className="oi oi-book"></span> Study
          </Link>
          <button className="btn btn-danger ml-auto" onClick={deleteHandler}>
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
