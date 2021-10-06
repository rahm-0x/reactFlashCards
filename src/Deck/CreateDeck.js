import React from "react";
import DeckOperation from "./DeckOperation";

//creatdeck component calls deck operation

const CreateDeck = () => {
  return <DeckOperation isNew={true} />;
};

export default CreateDeck;
