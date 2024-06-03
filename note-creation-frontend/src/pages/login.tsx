import { Link } from 'react-router-dom'
import LinkBack from '../components/link-back'
import { useAuth } from '../components/hooks/useAuth'
import SuccessError from '../components/success-error'
import Layout from '../components/layout'
import NoteDecor from '../components/notes/note-decor'
import { useEffect } from 'react'

export default function Login() {
  const {
    error,
    success,
    login,
    handleChanges,
    loginUser,
    checkAuthentication
  } = useAuth()

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

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
      <NoteDecor
        content="Let's go!"
        color='yellow-light'
        grado={3}
        bottom={2}
        right={2}
      />
      <NoteDecor
        content='Find your way'
        color='blue-light'
        grado={-20}
        top={2}
        left={2}
      />
    </Layout>
  )
}
