import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api.js';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Main from './Main.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Footer from './Footer.js';

import * as auth from '../auth';

import { CurrentUserContext } from './../contexts/CurrentUserContext.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registed, setRegisted] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleTokenCheck = () => { 
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt'); 
      auth.checkToken(jwt) 
      .then((res) => { 
        if (res) {
          setEmail(res.data.email);
          history.push('/');
        }
      })
      .catch((error) => console.log(error));
      setLoggedIn(true);
    }
  }

  function componentDidMount() {
    handleTokenCheck();
  }

  const history = useHistory();

  function handleSignIn() {
    setLoggedIn(true);
  }

  function handleRegister() {
    setRegisted(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleDeleteCardClick(card) {
    setCardToDelete(card);
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
    .then((userData) => {
      setCurrentUser(userData);
      setIsEditAvatarPopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleEditProfile(user) {
    api.updateUserInfo(user)
    .then((userData) => {
      setCurrentUser(userData);
      setIsEditProfilePopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then ((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddCardPopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
            c._id === card._id ? newCard : c))
      })
      .catch((error) => console.log(error));
  }

  function handleDeletePlaceSubmit(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((cards) => 
          cards.filter((c) => 
            c._id !== card._id))
        setCardToDelete(null);
      })
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddCardPopupOpened(false);
    setIsInfoTooltipOpened(false);
    setCardToDelete(null);
    setSelectedCard(false);
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
    .then((data) => {
      if (data) {
        history.push('/sign-in');
        setRegisted(true);
        setIsInfoTooltipOpened(true);
      }
    })
    .catch((error) => {
      console.log(error)
      setRegisted(false);
      setIsInfoTooltipOpened(true);
    });
  }

  function handleLoginSubmit (email, password) {
    auth.authorize(email, password)
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((error) => {
      console.log(error)
      setRegisted(false);
      setIsInfoTooltipOpened(true);
    });
  }

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards() 
    ])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setCards(cardData);
    })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    componentDidMount();
  }, []);

  return(
      <div className='page'>
      <div className='page-container'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            onSignOut={handleSignOut}
            email={email}
          />
          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              />
            <Route path='/sign-up'>
              <Register 
                onRegister={handleRegisterSubmit}
                onSubmit={handleRegister}
              />
            </Route>
            <Route path='/sign-in'>
              <Login 
                onLogin={handleLoginSubmit}
                onSubmit={handleSignIn}
              />
            </Route>
            <Route path='/'>
              {loggedIn ?  
                <Redirect to='/main' /> :
                <Redirect to='./sign-up' />}
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpened} 
            onClose={closeAllPopups}
            registed={registed}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpened} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} 
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpened} 
            onClose={closeAllPopups}
            onEditProfile={handleEditProfile}
          />
          <AddPlacePopup 
            isOpen={isAddCardPopupOpened} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeletePlacePopup 
            isOpen={!!cardToDelete} 
            onClose={closeAllPopups}
            onDeletePlace={handleDeletePlaceSubmit}
            card={cardToDelete}
          />
          <ImagePopup
            name='preview-card'
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
