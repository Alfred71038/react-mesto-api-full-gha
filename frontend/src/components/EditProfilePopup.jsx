import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });

    }

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                id="name-input"
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__input popup__input_type_name"
                minLength="2"
                maxLength="40"
                required
                value={name || ''}
                onChange={e => setName(e.target.value)} />
            <span className="popup__input-error name-input-error"></span>
            <input
                id="about-me-input"
                type="text"
                name="about"
                placeholder="О себе"
                className="popup__input popup__input_type_about-me"
                minLength="2"
                maxLength="200"
                required
                value={description || ''}
                onChange={e => setDescription(e.target.value)} />
            <span className="about-me-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}