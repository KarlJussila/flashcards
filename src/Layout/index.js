import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import DeckInfo from "./DeckInfo";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import { listDecks } from "./../utils/api";

function Layout() {
    const [deckList, setDeckList] = useState([]);
    const addDeck = (deck) => setDeckList([...deckList, deck]);
    const removeDeck = (deckId) => setDeckList(deckList.filter((deck) => deck.id !== deckId))

    useEffect(() => {
        async function loadDecks() {
            const decks = await listDecks();
            setDeckList(decks);
        }
        loadDecks();
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
                        <DeckList deckList={deckList} removeDeck={removeDeck}/>
                    </Route>
                    <Route path="/decks/new">
                        <CreateDeck addDeck={addDeck}/>
                    </Route>
                    <Route path="/decks/:deckId">
                        <DeckInfo removeDeck={removeDeck} deckList={deckList}/>
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default Layout;
