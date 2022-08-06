import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = useState('');
    function handleTitleChange(e) {
        setTitle(e.target.value);
    };

    const [link, setLink] = useState('');
    function handleLinkChange(e) {
        setLink(e.target.value);
    };

    function clearInputs() {
        setTitle('');
        setLink('');
    };

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: title,
            link: link
        });
        clearInputs();
    };

    function handleClose() {
        onClose();
        clearInputs();
    };

    return (
        <PopupWithForm
            name="add-photo"
            title="Новое место"
            formName="addNewPhotoForm"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}        
        >
            <label className="form__item">
                <input
                    className="form__input form__input_type_title"
                    id="title-input"
                    type="text"
                    name="name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                    value={title || ''}
                    onChange={handleTitleChange}
                />
            <span className="form__input-error title-input-error">Вы пропустили это поле.</span>                
            </label>
            <label className="form__item">
                <input
                    className="form__input form__input_type_link"
                    id="card-link-input"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    value={link || ''}
                    onChange={handleLinkChange}
                />
                <span className="form__input-error card-link-input-error">Вы пропустили это поле.</span>                
            </label>
        </PopupWithForm>
    )
};

export default AddPlacePopup;
