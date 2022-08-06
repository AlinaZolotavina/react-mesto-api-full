import React, { useState } from "react";
import { Link } from 'react-router-dom'; 

function Register({ onRegister }) {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        onRegister(email, password);
    }

    return (
        <form className="login form" name="login-form" noValidate="" onSubmit={handleSubmit}>
            <h2 className="login__title">Регистрация</h2>
            <label className="login__form-item">
                <input
                    className="login__form-input login__form-input_type_email"
                    id="email-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={data.email || ''} 
                    onChange={handleChange}
                />
                <span className="login__form-input-error email-input-error">Вы пропустили это поле.</span>
            </label>
            <label className="login__form-item">
                <input 
                    className="login__form-input login__form-input_type_password"
                    id="password-input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    value={data.password || ''}
                    onChange={handleChange}
                />
                <span className="login__form-input-error password-input-error">Вы пропустили это поле.</span>
            </label>
            <button className="button button_place_login" type="submit">Зарегистрироваться</button>
                <p className="login__text">
                    Уже зарегистрированы? 
                    <Link
                        className="login__link"
                        to='/sign-in'
                    >
                        &nbsp;Войти
                    </Link>
                </p>
        </form>
    )
}

export default Register;