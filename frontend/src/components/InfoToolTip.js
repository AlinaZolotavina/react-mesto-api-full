import React from "react";
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoToolTip({ isOpen, isSuccess, onClose, textSuccess, textFail}) {
    return (
        <div className={`popup popup_type_sign-up ${isOpen && 'popup_is-opened'}`}>
            <div className="info-tool-tip">
                <img className="info-tool-tip__icon" src={isSuccess ? successIcon : failIcon} alt="Иконка успешной или неудачной регистрации" />
                <p className="info-tool-tip__text">
                    {isSuccess ? textSuccess : textFail}
                </p>
                <button className="popup__close-btn" onClick={onClose}></button>
            </div>
        </div>
        )
}

export default InfoToolTip;