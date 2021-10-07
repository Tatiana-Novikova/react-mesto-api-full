import React from 'react';
import { Link } from 'react-router-dom';

function Register ({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onRegister(email, password)
  }


  return (
    <div className='authorization-page register'>
      <h2 className='authorization-page__title'>Регистрация</h2>
      <form 
        className='form'
        onSubmit={handleSubmit}
      >
        <input
          className='form__input form__input_place_auth'
          id='email' 
          name='email' 
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className='form__input form__input_place_auth'
          id='password' 
          name='password' 
          type='password' 
          placeholder='Пароль'
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className='form__submit-button form__submit-button_place_auth opacity-transition' 
          type='submit'
        >
          Зарегистрироваться
        </button>
        <Link 
          to='/sign-in'
          className='form__sign-in-link'
        >
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register;