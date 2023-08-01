import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({ name, link });

    }

    React.useEffect(() => {
        if (!isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name={'card'}
            title={'Новое место'}
            buttonText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                id="title-input"
                type="text"
                name="name"
                placeholder="Название"
                className="popup__input popup__input_card-type-title"
                minLength="2"
                maxLength="30"
                required
                value={name}
                onChange={e => setName(e.target.value)} />
            <span className="title-input-error popup__input-error"></span>
            <input
                id="link-input"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_about-me"
                required
                value={link}
                onChange={e => setLink(e.target.value)} />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>

    )
}