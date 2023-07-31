import Close from '../images/Close-Icon.svg'

function ImagePopup({ isOpen, onClose, card }) {

    return (
        <section className={isOpen ? `popup popup_zoom-image popup_opened` : `popup popup_zoom-image`} id="image">
            <div className="popup__container popup__container_image">
                <button
                    className="popup__close-button"
                    type="button">
                    <img src={Close}
                        className="popup__button-image"
                        alt="Крестик" onClick={onClose} />
                </button>
                <img className="popup__image" alt={card.name} src={card.link} />
                <p className="popup__signature">{card.name}</p>
            </div>
        </section>
    )
}

export default ImagePopup