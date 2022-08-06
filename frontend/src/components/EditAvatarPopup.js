import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef(null);

    function clearInput() {
        inputRef.current.value = '';
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
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
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <label className="form__item">
                <input
                    className="form__input form__input_type_link"
                    id="avatar-link-input"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку" 
                    required
                    defaultValue=''
                    ref={inputRef}
                />
                <span className="form__input-error avatar-link-input-error">Вы пропустили это поле.</span>
            </label>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;
