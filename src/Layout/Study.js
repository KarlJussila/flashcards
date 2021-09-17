import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { listCards } from "./../utils/api";
import CardDisplay from "./CardDisplay";

function Study({ deck, deckList }) {
    const params = useParams();
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        async function loadCards() {
            const cards = await listCards(params.deckId);
            setCardList(cards);
        }
        loadCards();
    }, []);

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${params.deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <CardDisplay deck={deck}/>
        </>
    );
}

export default Study;
