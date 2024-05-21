import { Link } from 'react-router-dom'
import '../styles/account.css'
import { useState } from 'react'
import { register } from '../types/account-types'
import fetchApi from '../utils/fetch-api'
import { error } from '../types/error-type'
import LinkBack from '../components/link-back'

export default function Register() {
  const [registerUser, setRegisterUser] = useState<register>({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })
  const [success, setSuccess] = useState('')

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setRegisterUser({ ...registerUser, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')
    try {
      await fetchApi({
        path: '/auth/register',
        method: 'POST',
        body: registerUser,
        authorization: false
      })
      setSuccess('Registro exitoso')
      setRegisterUser({
        username: '',
        email: '',
        password: ''
      })
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <section className='account'>
      <form className='account__form' onSubmit={handleSubmit}>
        <LinkBack path='/' />
        <h1>Register</h1>
        <div className='account__form-group '>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={registerUser.username}
            required
            onChange={handleChanges}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={registerUser.email}
            required
            onChange={handleChanges}
          />
        </div>
        <div className='account__form-group '>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={registerUser.password}
            required
            onChange={handleChanges}
          />
        </div>
        <button type='submit'>Register</button>
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
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </section>
  )
}
