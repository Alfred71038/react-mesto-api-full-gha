import Close from '../images/Close-Icon.svg'

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {


    return (
        <section className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}
        >
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button" onClick={onClose}>
                    <img src={Close}
                        className="popup__button-image"
                        alt="Крестик" />
                </button>
                <form className="popup__form"
                    name={name}
                    onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    <div className={`popup__form-section`}>
                        {children}
                    </div>
                    <button
                        type="submit"
                        className="popup__button" name="button">
                        {buttonText}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm