import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        } else {
            setName('Жак-Ив Кусто');
            setDescription('исследователь');
        }
    }, [isOpen, currentUser]);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const validateName = (name) => {
        if((name.length < 2) || (name.length > 40)) {
            setNameError('Имя должно быть от 2 до 40 символов');
            if (!name) {
                setNameError('Вы пропустили это поле');
            }
        } else setNameError('');
    }
    function handleNameChange(e) {
        setName(e.target.value);
    };

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [descriptionDirty, setDescriptionDirty] = useState(false);
    const validateDescription = (description) => {
        if((description.length < 2) || (description.length > 40)) {
            setDescriptionError('Информация о Вас должна быть от 2 до 200 символов');
            if (!description) {
                setDescriptionError('Вы пропустили это поле');
            }
        } else setDescriptionError('');
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true);
                break;
            case 'about':
                setDescriptionDirty(true);
                break;
            default: break;
        }
    }

    useEffect(() => {
        validateName(name);
        validateDescription(description);
        checkFormValidity(nameError, descriptionError);
    }, [name, description, nameError, descriptionError]);

    const [isValid, setIsValid] = useState(false);
    const checkFormValidity = (nameError, descriptionError) => {
        if(!nameError && !descriptionError) {
            setIsValid(true);
        } else setIsValid(false);
    }

    // function clearErrors() {
    //     setNameError('');
    //     setDescriptionError('');
    // }

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
            isValid={isValid}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <label className="form__item">
                <input 
                    className={`form__input form__input_type_name ${(nameError && nameDirty) ? 'form__input_type_error' : ''}`}
                    id="name-input"
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    required
                    value={name || ''}
                    onChange={handleNameChange}
                    onBlur={blurHandler}
                />
                <span className={`form__input-error name-input-error ${(nameError && nameDirty) ? 'form__input-error_active' : ''}`}>{nameError}</span>
            </label>
            <label className="form__item">
                <input
                    className={`form__input form__input_type_job ${(descriptionError && descriptionDirty) ? 'form__input_type_error' : ''}`}
                    id="job-input"
                    type="text"
                    name="about"
                    placeholder="Кратко о Вас"
                    required
                    value={description || ''}
                    onChange={handleDescriptionChange}
                    onBlur={blurHandler}
                />
                <span className={`form__input-error job-input-error ${(descriptionError && descriptionDirty) ? 'form__input-error_active' : ''}`}>{descriptionError}</span>
            </label>
        </PopupWithForm>
    )
};

export default EditProfilePopup;