import './header.css'
import { Link } from 'react-router-dom'
import { IconUser, IconBook } from '../icons'
import { useAuthStore } from '../../context/useContext'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { isAuth } = useAuthStore()
  const { logout } = useAuth()

  return (
    <header className='header'>
      <Link to='/' className='header__logo'>
        <IconBook className='header__icon' />
        <h1>My Notes</h1>
      </Link>

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
              <Link className='header__link' to='/login'>
                Sign in
              </Link>
              <Link className='header__link' to='/register'>
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
