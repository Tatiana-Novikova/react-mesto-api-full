import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button opacity-transition 
    ${isOwn ? 
      'card__delete-button_visible' : 
      'card__delete-button_hidden'}`
  ); 

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button opacity-transition 
    ${isLiked ? 
      'card__like-button_active' : 
      'card__like-button_inactive'}`
  ); 

  function handleClick() {
    onCardClick(card);
  };
  
  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className='card'>
      <button 
        className={`${cardDeleteButtonClassName}`} 
        type='button' 
        aria-label='Удалить' 
        onClick={handleDeleteClick}>
      </button>
      <img 
        className='card__image' 
        src={card.link} 
        alt={card.name} 
        onClick={handleClick}
      />
      <div className='card__main'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes-container'>
          <button 
            className={`${cardLikeButtonClassName}`}
            type='button' 
            aria-label='Оценить' 
            onClick={handleLikeClick}>
          </button>
          <span className='card__likes'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;