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
    const [userEmail, setUserEmail] = useState('');
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
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => { return (c._id === card._id ? newCard : c) }));
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

    const tokenCheck = () => {
        const token = localStorage.getItem('cookie');
        if (token) {
            console.log(token);
            setLoggedIn(true);
            navigate('/singin', { replace: true });
        }
    }

    const handleLoginSubmit = ({ email, password }) => {
        auth.authorize({ email, password })
            .then(res => {
                if (password && email !== '') {
                    localStorage.setItem('cookie', true);
                    setUserEmail(email);
                    setLoggedIn(true);
                    navigate('/', { replace: true });
                }
            })
            .catch(err => {
                setIsInfoTooltip(false);
                setIsStatusPopupOpen(true);
                console.log(err);
            })
    }

    const handleRegisterSubmit = ({ email, password }) => {
        const data = { password, email };
        auth.register(data)
            .then(() => {
                setIsInfoTooltip(true);
                setIsStatusPopupOpen(true)
                navigate('/sign-in', { replace: true })
            })
            .catch(err => {
                setIsInfoTooltip(false);
                console.error(err)
            })
            .finally(() => setIsStatusPopupOpen(true));
    }

    const signOut = () => {
        auth.userSignOut()
            .then((res) => {
                if (res.exit) {
                    console.log('Back');
                    localStorage.removeItem('cookie');
                    setLoggedIn(false);
                    setUserEmail('');
                    navigate('/sign-in', { replace: true });
                    document.cookie = "jwtChek=; expires=Mon, 26 Dec 1991 00:00:01 GMT;";
                }
            })
            .catch(error => console.log(error))
    };

    React.useEffect(() => {
        tokenCheck();
    }, []);

    React.useEffect(() => {
        if (loggedIn === true) {
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => {
                   signOut();
                    if(err === 401) {
                        setIsInfoTooltip(false);
                    setIsStatusPopupOpen(true);}  
                });

            api.getInitialCards()
                .then((data) => {
                    setCards(data.card.reverse());
                }).catch(error => console.log(error))
        }
    }, [loggedIn]);


    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Header
                    loggedIn={loggedIn}
                    signOut={signOut}
                    userEmail={userEmail}
                />
                <Routes>
                    <Route path='/'
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
                            handleRegisterSubmit={handleRegisterSubmit}
                        />}
                    />

                    <Route path='/sign-in'
                        element={<Login
                            handleLoginSubmit={handleLoginSubmit}
                        />}
                    />

                    <Route path='*' element={<Navigate to='/' replace />} />

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
