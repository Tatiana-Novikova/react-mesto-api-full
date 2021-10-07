import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup ({ isOpen, onClose, onDeletePlace, card }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }

  return (
    <PopupWithForm
      name='delete-card'
      title='Вы уверены?'
      buttonText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeletePlacePopup;