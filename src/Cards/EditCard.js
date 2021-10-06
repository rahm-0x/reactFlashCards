import React from "react";
import CardOperation from "./CardOperation";

//edit card component. prop is set to false verifying that you can edit this card, then updating the
//setcardList

const EditCard = ({ deck, setCardList }) => {
  return <CardOperation deck={deck} isNew={false} setCardList={setCardList} />;
};

export default EditCard;
