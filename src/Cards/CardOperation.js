import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

//cardoperation component renders either add card or edit card based on setcardlist prop.

const CardOperation = ({ deck, isNew, setCardList }) => {
  const { cardId } = useParams();
  const initCard = isNew
    ? { front: "", back: "" }
    : deck.cards.find((card) => card.id === Number(cardId));
  const [newCard, setNewCard] = useState({ ...initCard });
  const history = useHistory();

  const changeHandler = (event) => {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const aC = new AbortController();
    if (isNew) {
      await createCard(deck.id, newCard, aC.signal);
      setNewCard(initCard);
    } else {
      await updateCard(newCard, aC.signal);
      history.push(`/decks/${deck.id}`);
    }
    setCardList(true);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb w-50">
          <li className="breadcrumb-item" key="1">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" key="2">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="3">
            {isNew ? "Add Card" : `Edit Card ${newCard.id}`}
          </li>
        </ol>
      </nav>
      <div>
        <h3>
          {deck.name}: {isNew ? "Add Card" : "Edit Card"}
        </h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-group w-50">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
            rows="5"
            onChange={changeHandler}
            value={newCard.front}
          ></textarea>
        </div>
        <div className="form-group w-50">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            placeholder="Back side of card"
            rows="5"
            onChange={changeHandler}
            value={newCard.back}
          ></textarea>
          <button
            type="button"
            onClick={() => history.push(`/decks/${deck.id}`)}
            className="btn btn-secondary mt-3 mr-3"
          >
            Done
          </button>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardOperation;
