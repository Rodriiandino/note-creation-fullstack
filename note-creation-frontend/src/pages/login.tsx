import { Link } from 'react-router-dom'
import LinkBack from '../components/link-back'
import { useAuth } from '../components/hooks/useAuth'
import SuccessError from '../components/success-error'
import Layout from '../components/layout'

export default function Login() {
  const { error, success, login, handleChanges, loginUser } = useAuth()

  return (
    <Layout>
      <form className='account__form' onSubmit={login}>
        <LinkBack path='/' />
        <h1>Login</h1>
        <div className='account__form-group '>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={loginUser.username}
            required
            onChange={e => handleChanges(e, 'login')}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={loginUser.password}
            required
            onChange={e => handleChanges(e, 'login')}
          />
        </div>
        <button type='submit'>Login</button>
        <SuccessError error={error} success={success} />
        <small className='account__link'>
          Don't have an account? <Link to='/register'>Register</Link>
        </small>
      </form>
    </Layout>
  )
}
