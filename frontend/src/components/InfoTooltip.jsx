import React from "react";
import Close from '../images/Close-Icon.svg'

function InfoTooltip({ isOpen, onClose, name, status }) {
    return (
        <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
            <div className="popup__container">
                <div className={`popup__status ${status ? 'popup__status_type_success' : 'popup__status_type_fail'}`}></div>
                <h2 className="popup__title_status">
                    {status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
                <button type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                    <img src={Close}
                        className="popup__button-image"
                        alt="Крестик" />
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip