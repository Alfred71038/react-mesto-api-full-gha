import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/Auth';

import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { ProtectedRoute } from './Protectedroute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState({ email: '' });
    const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false)
    const [isInfoTooltip, setIsInfoTooltip] = useState(false)

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)

    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsStatusPopupOpen(false)
    }



    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(error => console.log(error))
    }


    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(error => console.log(error))
    }

    function handleUpdateAvatar(data) {
        api.patchUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(error => console.log(error))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(error => console.log(error))
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.createCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(error => console.log(error))
    }

    function signOut() {
        setLoggedIn(false);
        localStorage.removeItem('token')
        navigate('/sign-in', { replace: true })
    }

    function handleRegisterSubmit({ email, password }) {
        auth.register({ email, password })
            .then(() => {
                setIsInfoTooltip(true);
                navigate('/sign-in')
            })
            .catch(err => {
                setIsInfoTooltip(false);
                console.error(err)
            })
            .finally(() => setIsStatusPopupOpen(true));
    }

    function handleLogin(email) {
        setLoggedIn(true)
        setUserEmail(email)
    }

    function handleLoginSubmit({ email, password }) {
        auth.authorize({ email, password })
            .then(res => {
                if (res) {
                    localStorage.setItem('token', res.token);
                    handleLogin(email);
                    navigate('/main');
                }
            })
            .catch(err => {
                setIsInfoTooltip(false);
                setIsStatusPopupOpen(true);
                console.log(err);
            })
    }

    useEffect(() => {
        function tokenCheck() {
            const token = localStorage.getItem('token');
            if (token) {
                auth.checkToken(token)
                    .then(res => {
                        handleLogin(res.data.email);
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
        tokenCheck();
    }, [])


    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([data, card]) => {
                setCurrentUser(data);
                setCards(card)
            })
            .catch(error => console.log(error))
    }, []);


    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Header
                    loggedIn={loggedIn}
                    signOut={signOut}
                    userEmail={userEmail}
                />
                <Routes>
                    <Route path='/main'
                        element={(
                            <>
                                <ProtectedRoute
                                    element={Main}
                                    loggedIn={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    cards={cards}
                                    onCardDelete={handleCardDelete}
                                />
                                <ProtectedRoute
                                    element={Footer}
                                    loggedIn={loggedIn}
                                />
                            </>
                        )} />


                    <Route path='/sign-up'
                        element={<Register
                            handleRegisterSubmit={handleRegisterSubmit} />}
                    />

                    <Route path='/sign-in'
                        element={<Login
                            handleLoginSubmit={handleLoginSubmit} />}
                    />

                    <Route path='*' element={<Navigate to='/main' replace />} />

                </Routes>


                {/* Профиль */}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                {/* Карточки */}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddPlaceSubmit}
                />

                {/* Аватар */}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                {/* Подтверждение */}
                <PopupWithForm
                    name={'confirm'}
                    title={'Вы уверены?'}
                    buttonText={'Да'}>
                </PopupWithForm>

                {/* Зум картинки */}
                <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <InfoTooltip
                    isOpen={isStatusPopupOpen}
                    onClose={closeAllPopups}
                    name={'status'}
                    status={isInfoTooltip}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
