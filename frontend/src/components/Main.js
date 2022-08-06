import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteBtnClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__avatar-image" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <div className="profile__darkening"></div>
          <div className="profile__avatar-edit-btn" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-user">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onDeleteBtnClick={onDeleteBtnClick}  
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}    
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;