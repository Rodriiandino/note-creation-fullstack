import { useAuthStore } from '../context/useContext'
import { useAuth } from '../components/hooks/useAuth'
import { useEffect } from 'react'
import NotesContent from '../components/note-content/notes-content'

export default function NoteManager() {
  const { checkAuthentication } = useAuth()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  return (
    <>
      {isAuth && <NotesContent />}
      {!isAuth && <h1>Debes iniciar sesión para ver tus notas</h1>}
    </>
  )
}
