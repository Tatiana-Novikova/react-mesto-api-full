import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className='form__section'>
        <input 
          ref={avatarRef} 
          className='form__input form__input_place_popups'
          type='url' 
          id='form__input-avatar-link' 
          name='link' 
          placeholder='Ссылка' 
          minLength='0' 
          required 
        />
        <span 
          className='form__input-error' 
          id='form__input-avatar-link-error'>
        </span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;