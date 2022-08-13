import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [avatarDirty, setAvatarDirty] = useState('');
    const validateAvatar = (avatar) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^(https?:\/\/)(w{3})?([\da-z\.\-]+)\.([a-z\.]{2,6})([\w\.\-\_~:\/?#\[\]@!$&\'()*\+,;=])*#?\/?$/;
        if (!regex.test(avatar)) {
            setAvatarError('Некорректная ссылка на картинку');
            if(!avatar) {
                setAvatarError('Вы пропустили это поле');
            }
        } else setAvatarError('');
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    const blurHandler = (e) => {
        setAvatarDirty(true);
    }

    useEffect(() => {
        validateAvatar(avatar);
        checkFormValidity(avatarError);
    }, [avatar, avatarError])

    const [isValid, setIsValid] = useState(false);
    const checkFormValidity = (avatarError) => {
        if(!avatarError) {
            setIsValid(true);
        } else setIsValid(false);
    }

    function clearInput() {
        setAvatar('');
        setAvatarError('');
        setAvatarDirty(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar
        });
        clearInput();
    };

    function handleClose() {
        onClose();
        clearInput();
    };

    return (
        <PopupWithForm
            name="avatar-edit"
            title="Обновить аватар"
            formName="updateAvatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            isValid={isValid}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <label className="form__item">
                <input
                    className={`form__input form__input_type_link ${(avatarError && avatarDirty) ? 'form__input_type_error' : ''}`}
                    id="avatar-link-input"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку" 
                    required
                    value={avatar || ''}
                    onChange={handleAvatarChange}
                    onBlur={blurHandler}
                />
                <span className={`form__input-error avatar-link-input-error ${(avatarError && avatarDirty) ? 'form__input-error_active' : ''}`}>{avatarError}</span>
            </label>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;
