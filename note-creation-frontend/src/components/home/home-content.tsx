import './home-content.css'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../context/useContext'
import NoteDecor from '../notes/note-decor'

export default function HomeContent() {
  const { isAuth } = useAuthStore()

  return (
    <div className='home__content'>
      <header className='home__header'>
        <h1 className='home__title'>Welcome To My Notes</h1>
      </header>
      <section className='home__section'>
        <p>
          This is a simple note-taking app that allows you to create, read,
          update, and delete notes. You can create an account to save your notes
          and access them from any device.
        </p>
      </section>
      <footer className='home__footer'>
        {isAuth ? (
          <Link to='/notes'>Go to Notes</Link>
        ) : (
          <>
            <Link to='/login'>SingIn</Link>
            <Link to='/register'>SingUp</Link>
          </>
        )}
      </footer>
    </div>
  )
}
