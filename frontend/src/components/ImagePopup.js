import React from 'react';

function ImagePopup({ card, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_photo ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__wrapper">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close-btn" onClick={onClose}></button>
      </div>
    </div>
  )
};

export default ImagePopup;