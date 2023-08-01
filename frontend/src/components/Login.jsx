import React, { useState } from "react"

function Login({ handleLoginSubmit }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ email, password })
  }



  return (
    <div className="authentication">
      <h1 className="authentication__title">Вход</h1>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <input
          className='authentication__input authentication__input_email'
          placeholder='Email'
          name="email"
          type='email'
          minLength='5'
          maxLength='20'
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className='authentication__input authentication__input_password'
          placeholder='Пароль'
          name="password"
          type='password'
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
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login