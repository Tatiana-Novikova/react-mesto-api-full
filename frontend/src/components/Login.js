import React from 'react';

function Login ({ onLogin }) {
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
    onLogin(email, password)
  }

  return (
    <div className='authorization-page login'>
      <h2 className='authorization-page__title'>Вход</h2>
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
          required
        />
        <input
          className='form__input form__input_place_auth'
          id='password' 
          name='password' 
          type='password' 
          placeholder='Пароль'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button
          className='form__submit-button form__submit-button_place_auth opacity-transition' 
          type='submit'
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;