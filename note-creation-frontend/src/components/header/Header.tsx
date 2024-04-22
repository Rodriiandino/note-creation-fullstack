import './header.css'
import { IconUser, IconBook } from './icon.header'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__logo'>
        <IconBook className='header__icon' />
        <h1>My Notes</h1>
      </div>
      {/* <div className='header__user'>
        <div className='header__user-info'>
          <small>Sign in to save your notes</small>
          <button className='header__button'>Sign in</button>
        </div>
        <IconUser className='header__icon user__icon' />
      </div> */}
    </header>
  )
}
