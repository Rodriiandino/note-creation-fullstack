import Card from './Card'
import fetchApi from '../../utils/fetch-api'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/useContext'
import { CardType } from '../../types/card-types'
import { Suspense } from 'react'

export default function CardLists() {
  const { setNotes, notes, cardEditing, isEditing } = useStore()
  const [notesSorted, setNotesSorted] = useState<CardType[]>()

  useEffect(() => {
    fetchApi({ path: '/notes/all' }).then(data => setNotes(data))
  }, [])

  useEffect(() => {
    setNotesSorted(
      notes?.sort((a, b) => {
        return a.id < b.id ? 1 : -1
      })
    )
  }, [notes])

  return (
    <section className='card__lists'>
      {isEditing && cardEditing ? (
        <Card card={cardEditing} />
      ) : notesSorted && notesSorted.length > 0 ? (
        notesSorted.map(note => (
          <Suspense key={note.id} fallback={<p>Loading...</p>}>
            <Card key={note.id} card={note} />
          </Suspense>
        ))
      ) : (
        <article className='card card__no-notes'>
          <p>No notes found.</p>
        </article>
      )}
    </section>
  )
}
