import Card from './Card'
import { useEffect, useState } from 'react'
import { useStore, useAuthStore } from '../../context/useContext'
import { CardType } from '../../types/card-types'
import { Suspense } from 'react'
import { useNotes } from '../hooks/useNotes'
import SuccessError from '../success-error'

export default function CardLists() {
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
    if (!notes) return

    const sorted = notes.sort((a, b) => {
      return a.id < b.id ? 1 : -1
    })

    setNotesSorted(sorted)
  }, [notes])

  return (
    <section className='card__lists'>
      {isEditing && cardEditing ? (
        <Card card={cardEditing} />
      ) : notesSorted?.length ? (
        notesSorted?.map(note => (
          <Suspense key={note.id} fallback={<p>Loading...</p>}>
            <Card key={note.id} card={note} />
          </Suspense>
        ))
      ) : (
        <article className='card card__no-notes'>
          <p>No notes found.</p>
          <SuccessError success={success} error={error} />
        </article>
      )}
    </section>
  )
}
