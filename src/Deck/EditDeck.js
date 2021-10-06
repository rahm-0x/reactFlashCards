import React from "react";
import DeckOperation from "./DeckOperation";

/*
editdeck component called with deckoperation component passing in params..
*/

const EditDeck = ({ deck, setDeck }) => {
  return <DeckOperation deck={deck} isNew={false} setDeck={setDeck} />;
};

export default EditDeck;
