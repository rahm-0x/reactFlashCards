import React from "react";
import CardOperation from "./CardOperation";

//add card component. using isNew prop to verify if the card will render

const AddCard = ({ deck, setCardList }) => {
  return <CardOperation deck={deck} isNew={true} setCardList={setCardList} />;
};

export default AddCard;
