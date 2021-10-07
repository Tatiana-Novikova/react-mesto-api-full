import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({ isOpen, onClose, onEditProfile }) {
  const currentUser = 
    React.useContext(CurrentUserContext);
  const [name, setName] = 
    React.useState(currentUser ? currentUser.name : '');
  const [description, setDescription] = 
    React.useState(currentUser ? currentUser.about : '');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onEditProfile({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className='form__section'>
        <input 
          className='form__input form__input_place_popups'
          id='form__input-name' 
          name='nameInput' 
          type='text' 
          placeholder='Имя' 
          minLength='2' 
          maxLength='40' 
          required 
          value={name || ''} 
          onChange={handleNameChange}
        />
        <span 
          className='form__input-error' 
          id='form__input-name-error'>
        </span>
      </section> 
      <section className='form__section'>
        <input 
          className='form__input' 
          id='form__input-profession' 
          name='professionInput' 
          type='text' 
          placeholder='Профессия' 
          minLength='2' 
          maxLength='200' 
          required 
          value={description || ''} 
          onChange={handleDescriptionChange}
        />
        <span 
          className='form__input-error' 
          id='form__input-profession-error'>
        </span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup