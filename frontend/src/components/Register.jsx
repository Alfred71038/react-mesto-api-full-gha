import React, { useState } from "react";
import { Link } from "react-router-dom";




function Register({ handleRegisterSubmit }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    const { email, password } = formValue;

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegisterSubmit({ email, password })
    }

    return (
        <div className="authentication">
            <h1 className="authentication__title">Регистрация</h1>
            <form className="authentication__form" onSubmit={handleSubmit}>
                <input
                    className='authentication__input authentication__input_email'
                    placeholder='Email'
                    type='email'
                    name="email"
                    minLength='5'
                    maxLength='20'
                    value={formValue.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className='authentication__input authentication__input_password'
                    placeholder='Пароль'
                    type='password'
                    name="password"
                    minLength='8'
                    maxLength='20'
                    value={formValue.password}
                    onChange={handleChange}
                    required
                />
                <button
                    className="authentication__submit"
                    type="submit"
                    name="button">
                    Зарегистрироваться
                </button>
            </form>
            <p className="register__sign-in">Уже зарегистрированы?&ensp;
                <Link to='/sign-in' className="register__login-link" href="#">Войти</Link>
            </p>
        </div>
    )
}

export default Register