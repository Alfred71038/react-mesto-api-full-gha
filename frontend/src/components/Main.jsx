import React from 'react'

import Vector from '../images/Vector.svg'
import Pencil from '../images/pencil.svg'
import Plus from '../images/plus.svg'

import { CurrentUserContext } from '../context/CurrentUserContext'
import Card from './Card'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);



    return (
        <>
            <main className="content">
                <section className="profile">
                    <img src={currentUser.avatar}
                        alt="Аватарка"
                        className="profile__avatar"
                        onClick={onEditAvatar} />
                    <img src={Vector} alt="Большой карандаш" className="profile__avatar-edit" />
                    <div className="profile__content-column">
                        <div className="profile__content">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button"
                                type="button"
                                onClick={onEditProfile}>
                                <img
                                    src={Pencil}
                                    alt="карандаш"
                                    className="profile__edit-image"
                                /></button>
                        </div>
                        <p className="profile__about-me">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button"
                        type="button"
                        onClick={onAddPlace}>
                        <img src={Plus}
                            alt="плюс"
                            className="profile__add-image"
                        />
                    </button>
                </section>
                <section className="elements">
                    <ul className="cards">
                        {cards.map((item) => (
                            <Card
                                card={item}
                                key={item._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete} />
                        ))}
                    </ul>
                </section>

            </main>
        </>
    )
}

export default Main