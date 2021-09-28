import React, { useState, useEffect } from "react";
import { listCards, readDeck, deleteDeck } from "./../utils/api";
import { Link, useParams, Switch, Route } from "react-router-dom";
import Study from "./Study";
import CardList from "./CardList";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

function DeckInfo({ removeDeck, deckList }) {
    const params = useParams();
    const [cardList, setCardList] = useState([]);
    const [deck, setDeck] = useState({});

    function confirmDelete() {
        let confirm = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
        if (confirm) {
            deleteDeck(deck.id);
            removeDeck(deck.id);
        }
    }

    function removeCard(id) {
        setCardList(cardList.filter((card) => card.id !== id));
    }

    function addCard(card) {
        setCardList([...cardList, card])
    }

    function editCard(cardData) {
        setCardList(cardList.map((card) => cardData.id === card.id ? cardData : card))
    }

    function editDeck(deckData) {
        setDeck(deckData);
    }

    useEffect(() => {
        async function loadData() {
            const cards = await listCards(params.deckId);
            const deckObj = await readDeck(params.deckId);
            setCardList(cards);
            setDeck(deckObj);
        }
        loadData();
    }, []);

    return (
        <>
            <Switch>
                <Route path="/decks/:deckId/study">
                    <Study deckList={deckList} deck={deck} cardList={cardList}/>
                </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeck deck={deck} editDeck={editDeck}/>
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <CreateCard deck={deck} addCard={addCard}/>
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard deck={deck} editCard={editCard}/>
                </Route>
                <Route path="/decks/:deckId">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                        </ol>
                    </nav>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{deck.name}</h5>
                            <p className="card-text">{deck.description}</p>
                            <Link to={`/decks/${deck.id}/edit`} style={{float:"left"}} className="btn btn-secondary mr-1">Edit</Link>
                            <Link to={`/decks/${deck.id}/study`} style={{float:"left"}} className="btn btn-primary mr-1">Study</Link>
                            <Link to={`/decks/${deck.id}/cards/new`} style={{float:"left"}} className="btn btn-primary mr-1">Add Card</Link>
                            <button style={{float:"right"}} className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>

                    <CardList cardList={cardList} removeCard={removeCard}/>
                </Route>
            </Switch>
        </>
    )
}

export default DeckInfo;
