import React from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

//cardlist component, renders the cardlist on the view deck page

const CardList = ({ deck: { cards }, url, setCardList }) => {
  const history = useHistory();

  const deleteHandler = (event, cardId) => {
    const result = window.confirm(
      "\nDelete this card?\n\nYou will not be able to recover it."
    );
    if (result) {
      (async function () {
        const aC = new AbortController();
        await deleteCard(cardId, aC.signal);
        setCardList(true);
        history.push(url);
      })();
    }
  };

  const content = cards.map((card) => {
    return (
      <div className="card w-50" key={card.id}>
        <div className="card-body">
          <div className="row">
            <p className="col card-text">{card.front}</p>
            <p className="col card-text">{card.back}</p>
          </div>
          <div className="row justify-content-end pt-3 pr-3">
            <Link
              to={`${url}/cards/${card.id}/edit`}
              className="btn btn-secondary mr-2 "
            >
              <span className="oi oi-pencil mr-1"></span>Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={(event) => deleteHandler(event, card.id)}
            >
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h3>Cards</h3>
      {content}
    </div>
  );
};

export default CardList;
