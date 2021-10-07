import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }

  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className='form__section'>
        <input 
          className='
            form__input
            form__input_place_popups
          '
          type='text' 
          id='form__input-place-title' 
          name='name' 
          placeholder='Название' 
          minLength='1' 
          maxLength='30' 
          required 
          value={name || ''} 
          onChange={handleNameChange}
        />
        <span 
          className='form__input-error' 
          id='form__input-place-title-error'>
        </span>
      </section>
      <section className='form__section'>
        <input 
          className='
            form__input
            form__input_place_popups
          '
          type='url' 
          id='form__input-place-link' 
          name='link' 
          placeholder='Ссылка' 
          minLength='0' 
          required 
          value={link || ''} 
          onChange={handleLinkChange}
        />
        <span 
          className='form__input-error' 
          id='form__input-place-link-error'>
        </span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup;