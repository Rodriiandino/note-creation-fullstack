import { Link } from 'react-router-dom'
import './header.css'
import { IconUser, IconBook } from './icon-header'
import { useAuthStore } from '../../context/useContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { isAuth } = useAuthStore()

  const navigate = useNavigate()

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    navigate(0)
  }

  return (
    <header className='header'>
      <div className='header__logo'>
        <IconBook className='header__icon' />
        <h1>My Notes</h1>
      </div>

      {isAuth && (
        <div className='header__user'>
          <div className='header__user-info'>
            <small>Welcome back!</small>
            <div className='header__user-links'>
              <button onClick={logout}>LogOut</button>
            </div>
          </div>
          <IconUser className='header__icon user__icon' />
        </div>
      )}

      {!isAuth && (
        <div className='header__user'>
          <div className='header__user-info'>
            <small>Sign in to create and save your notes!</small>
            <div className='header__user-links'>
              <Link className='header__link' to='login'>
                Sign in
              </Link>
              <Link className='header__link' to='register'>
                Sing up
              </Link>
            </div>
          </div>
          <IconUser className='header__icon user__icon' />
        </div>
      )}
    </header>
  )
}
