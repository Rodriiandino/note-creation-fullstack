import { Link } from 'react-router-dom'
import '../styles/account.css'
import { login, token } from '../types/account-types'
import { useState } from 'react'
import { error } from '../types/error-type'
import fetchApi from '../utils/fetch-api'
import LinkBack from '../components/link-back'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/useContext'

export default function Login() {
  const [loginUser, setLoginUser] = useState<login>({
    username: '',
    password: ''
  })
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })

  const { setIsAuth } = useAuthStore()
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setLoginUser({ ...loginUser, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')
    try {
      const token: token = await fetchApi({
        path: '/auth/login',
        method: 'POST',
        body: loginUser,
        authorization: false
      })
      setSuccess('Login exitoso')
      setLoginUser({
        username: '',
        password: ''
      })

      localStorage.setItem('token', token.token)
      setIsAuth(true)
      navigate('/')
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <section className='account'>
      <form className='account__form' onSubmit={handleSubmit}>
        <LinkBack path='/' />
        <h1>Login</h1>
        <div className='account__form-group '>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={loginUser.username}
            required
            onChange={handleChanges}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={loginUser.password}
            required
            onChange={handleChanges}
          />
        </div>
        <button type='submit'>Login</button>
        {error.status !== 0 && (
          <div className='account__error'>
            {error?.fieldErrors?.length > 0
              ? error.fieldErrors.map((fieldError, index) => (
                  <div key={index}>{fieldError.message}</div>
                ))
              : error.message}
          </div>
        )}
        {success && <div className='account__success'>{success}</div>}
        <small className='account__link'>
          Don't have an account? <Link to='/register'>Register</Link>
        </small>
      </form>
    </section>
  )
}
