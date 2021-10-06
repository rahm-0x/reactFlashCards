import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck, createDeck } from "../utils/api/index";

//deckoperation component renders for either create or edit. based on values passed in.

const DeckOperation = ({
  deck = { name: "", description: "" },
  isNew,
  setDeck,
}) => {
  const [newDeck, setNewDeck] = useState({ ...deck });
  const history = useHistory();

  const changeHandler = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    let resultantDeck = {};
    if (isNew) {
      resultantDeck = await createDeck(newDeck, abortController.signal);
    } else {
      resultantDeck = await updateDeck(newDeck, abortController.signal);
      setDeck(newDeck);
    }

    history.push(`/decks/${resultantDeck.id}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb w-50">
          <li className="breadcrumb-item" key="1">
            <Link to="/">Home</Link>
          </li>
          {!isNew ? (
            <li className="breadcrumb-item" key="2">
              <Link to={`/decks/${newDeck.id}`}>{newDeck.name}</Link>
            </li>
          ) : null}
          <li className="breadcrumb-item active" aria-current="page" key="3">
            {isNew ? "Create Deck" : "Edit Deck"}
          </li>
        </ol>
      </nav>
      <h2>{isNew ? "Create Deck" : "Edit Deck"}</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group w-50">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Deck Name"
            onChange={changeHandler}
            value={newDeck.name}
          />
        </div>
        <div className="form-group w-50">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Brief description of the deck"
            rows="5"
            onChange={changeHandler}
            value={newDeck.description}
          ></textarea>
          <button
            type="reset"
            onClick={() =>
              isNew ? history.push("/") : history.push(`/decks/${deck.id}`)
            }
            className="btn btn-secondary mt-3 mx-3"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckOperation;
