import { Link } from 'react-router-dom'
import './header.css'
import { IconUser, IconBook } from './icon.header'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__logo'>
        <IconBook className='header__icon' />
        <h1>My Notes</h1>
      </div>
      <div className='header__user'>
        <div className='header__user-info'>
          <small>Sign in to save your notes</small>
          <div className='header__user-links'>
            <Link className='header__link' to='login'>
              Sign in
            </Link>
            <Link className='header__link' to='register'>
              Register
            </Link>
          </div>
        </div>
        <IconUser className='header__icon user__icon' />
      </div>
    </header>
  )
}
