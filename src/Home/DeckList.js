import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";

//DeckList component displays all the decks

const DeckList = () => {
  const [deckList, setDeckList] = useState([]);
  const [dlt, setDlt] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDeckList);
    setDlt(false);
  }, [dlt]);

  const list = deckList.map((deck) => (
    <Deck deck={deck} key={deck.id} setDlt={setDlt} />
  ));
  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary mb-3">
          <span className="oi oi-plus mr-2"></span>
          Create Deck
        </button>
      </Link>
      <div>{list}</div>
    </div>
  );
};

export default DeckList;
