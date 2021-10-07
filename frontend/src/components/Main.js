import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main ({ 
  onEditProfile,
  onEditAvatar,
  onAddCard, 
  cards, 
  onCardClick, 
  onCardLike, 
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return ( 
    <main className='content'>
      <section className='profile'>
        <div className='profile__info-column'>
          <div 
            className='profile__avatar' 
            style={{ backgroundImage: `url(${currentUser.avatar})` }} 
          >
            <button 
              onClick={onEditAvatar}
              className='profile__avatar-edit-button opacity-transition'
              type='button'
              aria-label='Редактировать аватар'>
            </button>
            </div>
            <div className='profile__info-container'>
            <div className='profile__user-data-container'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <p className='profile__profession'>{currentUser.about}</p>
            </div>
            <button 
              onClick={onEditProfile}
              className='profile__edit-button opacity-transition' 
              type='button' 
              aria-label='Редактировать профиль'>
            </button>
            </div>
        </div>
        <button 
          onClick={onAddCard}
          className='profile__add-card-button opacity-transition' 
          type='button' 
          aria-label='Добавить карточку'>
        </button>
      </section>
      <section className='photo-grid'>
        {cards.map((card) => {
          return (<Card key={card._id} card={card} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete}
          />)
        })}
      </section>
    </main>
  );
}

export default Main