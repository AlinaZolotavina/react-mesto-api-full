import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import api from '../utils/api';
import * as auth from '../utils/auth.js';
import InfoToolTip from './InfoToolTip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);

  const history = useHistory();

  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPhotoPopupOpen, setAddPhotoPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    if(loggedIn) {
      api.getInitialData()
      .then(data => {
      const [userData, cardsData] = data;
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => console.log(err));
    }
  },  [loggedIn]);

  useEffect(() => {
    checkToken();
  }, [history.location]);

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPhotoPopupOpen() {
    setAddPhotoPopupOpen(!isAddPhotoPopupOpen);
  };

  function handleDeleteCardPopupOpen(card) {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setSelectedCard(card);
  };

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleCardClick(card) {
    setImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  };

  function handleCardLike(id, isLiked) {
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    })
    .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c))
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPhotoPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard({});
  };

  function handleUpdateUser(data) {
    api.changeUserData(data)
    .then(data => {
      setCurrentUser(data)       
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then(data => {
      setCurrentUser(data)
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
    .then(newCard => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function handleRegister(email, password) {
    auth.register(email, password)
    .then((res) => {
      if(res) {
        setSuccess(true);
        setInfoToolTipOpen(true);
        history.push('/sign-in');
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
      setInfoToolTipOpen(true);
    });

  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((data) => {
      if(data.token) {
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
        localStorage.setItem('jwt', data.token)
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
      setInfoToolTipOpen(true);
    });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt).then((res) => {
        setUserEmail(res.data.email)
        setLoggedIn(true);
        history.push('/');
      });      
    };
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <Switch>
          <ProtectedRoute 
            cards={cards}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPhotoPopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            onDeleteBtnClick={handleDeleteCardPopupOpen}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            exact path="/"
            loggedIn={loggedIn}
          />
          
          <Route path="/sign-in">
            <Login 
              onLogin={handleLogin}
            />
          </Route>

          <Route path="/sign-up">
            <Register 
              onRegister={handleRegister}
            />
          </Route>   

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"/>}
          </Route>
        </Switch>

        <Footer
            year={currentYear}
          />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPhotoPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        
        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
          textSuccess='Вы успешно зарегистрировались!'
          textFail='Что-то пошло не так! Попробуйте еще раз'
        />            
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
