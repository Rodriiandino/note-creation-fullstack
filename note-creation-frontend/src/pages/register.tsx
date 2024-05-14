import { Link } from 'react-router-dom'
import '../styles/account.css'

export default function Register() {
  return (
    <section className='account'>
      <form className='account__form'>
        <h1>Register</h1>
        <div className='account__form-group '>
          <label htmlFor='name'>Username</label>
          <input type='text' id='name' />
        </div>
        <div className='account__form-group '>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
        <button type='submit'>Register</button>
        <small className='account__link'>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </section>
  )
}
