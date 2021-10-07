import React from 'react';
import authSuccess from '../images/auth-success.svg';
import authFail from '../images/auth-fail.svg';

function InfoTooltip ({ isOpen, onClose, registed, title }) {
  
  return (
    <section className=
      {`popup
      ${isOpen ? 'popup_opened' : ''}`
      } 
    >
      <div className='popup__content popup__content_place_info-tooltip'>
        <button 
          className={`popup__close-button opacity-transition`} 
          type='button' 
          aria-label='Закрыть'
          onClick={onClose}
        />
        <figure className='popup__image-container'>
          <img 
            className='popup__image'
            src={`${registed
              ? authSuccess
              : authFail
            }`}
            alt={title} 
          />
          <h2 className='popup__title popup__title_place_info-tooltip'>
            {`${registed
              ? 'Вы успешно зарегистрировались!' 
              : 'Что-то пошло не так! Попробуйте ещё раз.'
            }`}
          </h2>
        </figure>
      </div>
    </section>
  );
}

export default InfoTooltip;