import { Link } from 'react-router-dom'
import LinkBack from '../components/link-back'
import { useAuth } from '../components/hooks/useAuth'
import SuccessError from '../components/success-error'
import Layout from '../components/layout'

export default function Register() {
  const { error, success, register, handleChanges, registerUser } = useAuth()

  return (
    <Layout>
      <form className='account__form' onSubmit={register}>
        <LinkBack path='/' />
        <h1>Register</h1>
        <div className='account__form-group '>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={registerUser.username}
            required
            onChange={e => handleChanges(e, 'register')}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={registerUser.email}
            required
            onChange={e => handleChanges(e, 'register')}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={registerUser.password}
            required
            onChange={e => handleChanges(e, 'register')}
          />
        </div>
        <button type='submit'>Register</button>
        <SuccessError error={error} success={success} />
        <small className='account__link'>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </Layout>
  )
}
