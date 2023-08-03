import Like from '../images/Like.svg';
import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__place-reaction ${isLiked && 'element__place-reaction_active'}`
    )

    return (
        <li className="element">
            <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
            <div className="element__place">
                <h2 className="element__place-name">{card.name}</h2>
                <div>
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}>
                        <img src={Like} alt="лайк" />
                    </button>
                    <p className="element__place-count">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button
                className="element__delete-button"
                type="button"
                onClick={handleDeleteClick} />}

        </li>
    )
}

export default Card