import Like from '../images/Like.svg';
import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `element__place-reaction ${isLiked && 'element__place-reaction_active'}`
    )

    return (
        <li className="element">
            <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
            <div className="element__place">
                <h2 className="element__place-name">{props.card.name}</h2>
                <div>
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}>
                        <img src={Like} alt="лайк" />
                    </button>
                    <p className="element__place-count">{props.card.likes.length}</p>
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