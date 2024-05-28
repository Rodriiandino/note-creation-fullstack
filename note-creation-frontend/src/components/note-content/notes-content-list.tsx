import { Suspense, useEffect, useState } from 'react'
import { useAuthStore, useStore } from '../../context/useContext'
import { CardType } from '../../types/card-types'
import { useNotes } from '../hooks/useNotes'
import Note from '../notes/note'
import NoteNotFound from '../notes/note-not-found'

export default function NotesContentList() {
  const { setNotes, notes, cardEditing, isEditing } = useStore()
  const [notesSorted, setNotesSorted] = useState<CardType[]>()
  const { getUserNotes, error, success } = useNotes()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    if (!isAuth) return

    let isMounted = true
    getUserNotes().then(data => isMounted && setNotes(data))
    return () => {
      isMounted = false
    }
  }, [isAuth])

  useEffect(() => {
    const sorted = notes?.sort((a, b) => {
      return a.id < b.id ? 1 : -1
    })

    setNotesSorted(sorted)

    return () => {
      setNotesSorted([])
    }
  }, [notes])

  return (
    <section className='card__lists'>
      {isEditing && cardEditing ? (
        <Note note={cardEditing} />
      ) : notesSorted?.length ? (
        notesSorted?.map(note => (
          <Suspense key={note.id} fallback={<p>Loading...</p>}>
            <Note key={note.id} note={note} />
          </Suspense>
        ))
      ) : (
        <NoteNotFound success={success} error={error} />
      )}
    </section>
  )
}
