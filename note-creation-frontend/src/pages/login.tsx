import { Link } from 'react-router-dom'
import '../styles/account.css'

export default function Login() {
  return (
    <div className='account'>
      <form className='account__form'>
        <h1>Login</h1>
        <div className='account__form-group '>
          <label htmlFor='name'>Username</label>
          <input type='text' id='name' />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
        <button type='submit'>Login</button>
        <small className='account__link'>
          Don't have an account? <Link to='/register'>Register</Link>
        </small>
      </form>
    </div>
  )
}
