import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck, deleteDeck } from "../utils/api";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

//main view page

const ViewDeck = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const {
    url,
    params: { deckId },
  } = useRouteMatch();
  const history = useHistory();

  const [cardList, setCardList] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const deckItem = await readDeck(deckId, abortController.signal);
      setDeck(deckItem);
      setCardList(false);
    };
    loadDeck();
  }, [deckId, cardList]);

  const deleteHandler = (event) => {
    const result = window.confirm(
      "\nDelete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
      (async function () {
        const aC = new AbortController();
        await deleteDeck(deck.id, aC.signal);
        history.push("/");
      })();
    }
  };

  const content = (
    <section className="container">
      <div>
        <div>
          <Switch>
            <Route exact path={url}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb w-50">
                  <li className="breadcrumb-item" key="1">
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    key="2"
                  >
                    {deck.name}
                  </li>
                </ol>
              </nav>
              <div className="row">
                <div className="w-50 mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <div className="d-flex">
                      <Link
                        to={`${url}/edit`}
                        className="btn btn-secondary mr-2 "
                      >
                        <span className="oi oi-pencil mr-1"></span>Edit
                      </Link>
                      <Link
                        to={`${url}/study`}
                        className="btn btn-primary mr-2"
                      >
                        <span className="oi oi-book"></span> Study
                      </Link>
                      <Link
                        to={`${url}/cards/new`}
                        className="btn btn-primary mr-2"
                      >
                        <span className="oi oi-plus"></span> Add Cards
                      </Link>
                      <button
                        className="btn btn-danger ml-auto"
                        onClick={deleteHandler}
                      >
                        <span className="oi oi-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <CardList
                deck={deck}
                key={deck.id}
                url={url}
                setCardList={setCardList}
              />
            </Route>
            <Route path={`${url}/study`}>
              <StudyDeck deck={deck} key={deck.id} />
            </Route>
            <Route path={`${url}/edit`}>
              <EditDeck deck={deck} key={deck.id} setDeck={setDeck} />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard deck={deck} key={deck.id} setCardList={setCardList} />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard deck={deck} key={deck.id} setCardList={setCardList} />
            </Route>
          </Switch>
        </div>
      </div>
    </section>
  );

  return deck.id ? (
    content
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default ViewDeck;
