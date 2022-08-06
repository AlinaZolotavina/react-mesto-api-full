import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    const [name, setName] = useState('');
    function handleNameChange(e) {
        setName(e.target.value);
    };

    const [description, setDescription] = useState('');
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: name,
          about: description
        });
    };

    function handleClose() {
        onClose();
        setName(currentUser.name);
        setDescription(currentUser.about);
    };

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            formName="editProfileForm"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <label className="form__item">
                <input 
                    className="form__input form__input_type_name"
                    id="name-input"
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    minLength="2"
                    maxLength="40"
                    required
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="form__input-error name-input-error">Вы пропустили это поле.</span>
            </label>
            <label className="form__item">
                <input
                    className="form__input form__input_type_job"
                    id="job-input"
                    type="text"
                    name="about"
                    placeholder="Кратко о Вас"
                    minLength="2"
                    maxLength="200"
                    required
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <span className="form__input-error job-input-error">Вы пропустили это поле.</span>
            </label>
        </PopupWithForm>
    )
};

export default EditProfilePopup;