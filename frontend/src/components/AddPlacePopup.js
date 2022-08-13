import React, { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [titleDirty, setTitleDirty] = useState(false);
    const validateTitle = (title) => {
        if((title.length < 2) || (title.length > 30)) {
            setTitleError('Название должно быть от 2 до 30 символов');
            if (!title) {
                setTitleError('Вы пропустили это поле');
            }
        } else setTitleError('');
    }
    function handleTitleChange(e) {
        setTitle(e.target.value);
    };

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState('');
    const [linkDirty, setLinkDirty] = useState(false);
    const validateLink = (link) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^(https?:\/\/)(w{3})?([\da-z\.\-]+)\.([a-z\.]{2,6})([\w\.\-\_~:\/?#\[\]@!$&\'()*\+,;=])*#?\/?$/;
        if (!regex.test(link)) {
            setLinkError('Некорректная ссылка на картинку');
            if (!link) {
                setLinkError('Вы пропустили это поле');
            } 
        } else setLinkError('');
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name': 
                setTitleDirty(true);
                break;
            case 'link':
                setLinkDirty(true);
                break;
            default: break;
        }
    };

    useEffect(() => {
        validateTitle(title);
        validateLink(link);
        checkFormValidity(titleError, linkError)
    }, [title, link, titleError, linkError]);

    const [isValid, setIsValid] = useState(false);
    const checkFormValidity = (titleError, linkError) => {
        if (!titleError && !linkError) {
            setIsValid(true);
        } else setIsValid(false);
    }

    function clearInputs() {
        setTitle('');
        setTitleError('');
        setTitleDirty(false);
        setLink('');
        setLinkError('');
        setLinkDirty(false);
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
            isValid={isValid}
            onClose={handleClose}
            onSubmit={handleSubmit}        
        >
            <label className="form__item">
                <input
                    className={`form__input form__input_type_title ${(titleError && titleDirty) ? 'form__input_type_error' : ''}`}
                    id="title-input"
                    type="text"
                    name="name"
                    placeholder="Название"
                    required
                    value={title || ''}
                    onChange={handleTitleChange}
                    onBlur={blurHandler}
                />
            <span className={`form__input-error title-input-error ${(titleError && titleDirty) ? 'form__input-error_active' : ''}`}>{titleError}</span>                
            </label>
            <label className="form__item">
                <input
                    className={`form__input form__input_type_link ${(linkError && linkDirty) ? 'form__input_type_error' : ''}`}
                    id="card-link-input"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    value={link || ''}
                    onChange={handleLinkChange}
                    onBlur={blurHandler}
                />
                <span className={`form__input-error card-link-input-error ${(linkError && linkDirty) ? 'form__input-error_active' : ''}`}>{linkError}</span>                
            </label>
        </PopupWithForm>
    )
};

export default AddPlacePopup;
