import React from 'react';

function ImagePopup({ name, card, onClose }) {
  const isOpen = !!card;

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return() => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  } 

    return (
      <section 
        className={
          `popup popup_type_${name} 
          ${card.link ? 'popup_opened' : ''}`
        }
        onClick={handleOverlayClose}
      >
        <div className='popup-preview-card__content'>
          <button 
            className='popup__close-button popup-preview-card__close-button opacity-transition' 
            type='button' 
            aria-label='Закрыть'
            onClick = {onClose}
          />
          <img 
            className='popup-preview-card__image' 
            src={card.link} 
            alt={card.name} 
          />
          <h2 className='popup-preview-card__title'>
            {card.name}
          </h2>
        </div>
      </section>
    );
  }
  
  export default ImagePopup;