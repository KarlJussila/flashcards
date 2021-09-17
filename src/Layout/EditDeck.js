import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateDeck } from "./../utils/api";

function EditDeck({ deck, editDeck }) {
    const params = useParams();
    const history = useHistory();

    const [name, setName] = useState(deck.name);
    const handleNameChange = (event) => setName(event.target.value);

    const [description, setDescription] = useState(deck.description);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    async function handleSubmit(event) {
        event.preventDefault();
        deck.name = name;
        deck.description = description;
        updateDeck(deck);
        editDeck(deck);
        history.push(`/decks/${deck.id}`);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Create Card</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="deckName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="deckName"
                        placeholder="Deck Name"
                        onChange={handleNameChange}
                        value={name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Brief description of the deck"
                        onChange={handleDescriptionChange}
                        value={description}
                    ></textarea>
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    );
}

export default EditDeck;
