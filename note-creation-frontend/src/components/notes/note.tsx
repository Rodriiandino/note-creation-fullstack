import './note.css'
import { IconArchive, IconUnarchive, IconTrash, IconPen } from '../icons'
import { CardType } from '../../types/card-types'
import { useStore } from '../../context/useContext'
import { useNotes } from '../hooks/useNotes'

export default function Note({ note }: { note: CardType }) {
  const { setIsEditing, setCardEditing, isEditing } = useStore()
  const { handleDeleteNote, handleArchiveNote, handleUnarchiveNote } =
    useNotes()

  const handleEdit = () => {
    setIsEditing(true)
    setCardEditing(note)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCardEditing(null)
  }

  return (
    <article className='note'>
      <header className='note__header'>
        <h3>{note.title}</h3>
        {!isEditing && (
          <button
            onClick={() => handleDeleteNote(note.id)}
            className='note__button'
          >
            <IconTrash />
          </button>
        )}
      </header>
      <section className='note__section'>
        <p>{note.content}</p>
      </section>
      <footer className='note__footer'>
        <div>
          <button onClick={handleEdit} className='note__button'>
            <IconPen />
          </button>
          {!isEditing && (
            <button
              onClick={() =>
                note.archived
                  ? handleUnarchiveNote(note.id)
                  : handleArchiveNote(note.id)
              }
              className='note__button'
            >
              {note.archived ? <IconArchive /> : <IconUnarchive />}
            </button>
          )}
        </div>
        <div className='note__categories'>
          {note.categories.map(category => (
            <span className='note__category' key={category.id}>
              {category.name}
            </span>
          ))}
        </div>
        {isEditing && (
          <button className='note__button--cancel' onClick={handleCancel}>
            Cancel
          </button>
        )}
      </footer>
    </article>
  )
}
