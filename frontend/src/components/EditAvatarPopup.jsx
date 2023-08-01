import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value);
    }

    React.useEffect(() => {
        if (!isOpen) {
            avatar.current.value = '';
        }
    }, [isOpen])



    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                id="avatar-input"
                type="url"
                name="link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required
                ref={avatar} />
            <span className="avatar-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}