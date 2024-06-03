import { useCallback, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, register, token } from '../../types/account-types'
import { error } from '../../types/error-type'
import {
  getToken,
  isTokenExpired,
  removeToken,
  setToken
} from '../../utils/token-service'
import { useAuthStore } from '../../context/useContext'
import { registerUserApi, loginUserApi } from '../../utils/api-service'

export function useAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const [loginUser, setLoginUser] = useState<login>({
    username: '',
    password: ''
  })
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
  const { setIsAuth } = useAuthStore()

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'login' | 'register'
  ) => {
    const { id, value } = e.target
    if (type === 'login') {
      setLoginUser({ ...loginUser, [id]: value })
    } else {
      setRegisterUser({ ...registerUser, [id]: value })
    }
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')
    try {
      const token: token = await loginUserApi(loginUser)
      setSuccess('Login exitoso')
      setLoginUser({
        username: '',
        password: ''
      })

      setToken(token.token)
      setIsAuth(true)
      navigate('/notes')
    } catch (error: any) {
      setError(error)
    }
  }

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')
    try {
      await registerUserApi(registerUser)
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

  const logout = () => {
    if (getToken()) {
      removeToken()
      setIsAuth(false)
      navigate('/')
    }
  }

  const checkAuthentication = useCallback(() => {
    const token = getToken()
    const isAuth = token && !isTokenExpired(token)

    setIsAuth(!!isAuth)

    if (isAuth) {
      if (location.pathname === '/login' || location.pathname === '/register') {
        navigate('/notes')
      }
    } else {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/')
      }
    }
  }, [location.pathname, navigate])

  return {
    login,
    register,
    logout,
    handleChanges,
    checkAuthentication,
    error,
    success,
    loginUser,
    registerUser
  }
}
