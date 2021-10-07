import React from 'react';

function PopupWithForm ({ 
  name, 
  title,
  buttonText,
  onClose,
  isOpen,
  onSubmit,
  children
}) {

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
      className=
        {`popup popup_type_${name} 
        ${isOpen ? 'popup_opened' : ''}`
        }
      onClick={handleOverlayClose}
    >
      <div className='popup__content'>
        <button 
          className={`popup__close-button opacity-transition`} 
          type='button' 
          aria-label='Закрыть'
          onClick ={onClose}
        />
        <h2 className='popup__title'>{title}</h2>
        <form 
          className='form' 
          name={name}
          onSubmit={onSubmit}
          noValidate 
          autoComplete='off'
        >
        {children}
          <button
            className='form__submit-button form__submit-button_place_popups opacity-transition' 
            type='submit'
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;