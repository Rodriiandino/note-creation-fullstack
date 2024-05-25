import { IconArchive, IconUnarchive, IconTrash, IconPen } from '../icons'
import { CardType } from '../../types/card-types'
import { useStore } from '../../context/useContext'
import { useNotes } from '../hooks/useNotes'

export default function Card({ card }: { card: CardType }) {
  const { setIsEditing, setCardEditing, isEditing } = useStore()
  const { handleDeleteNote, handleArchiveNote, handleUnarchiveNote } =
    useNotes()

  const handleEdit = () => {
    setIsEditing(true)
    setCardEditing(card)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCardEditing(null)
  }

  return (
    <article className='card'>
      <header className='card__header'>
        <h3>{card.title}</h3>
        {!isEditing && (
          <button
            onClick={() => handleDeleteNote(card.id)}
            className='button__card'
          >
            <IconTrash />
          </button>
        )}
      </header>
      <section className='card__section'>
        <p>{card.content}</p>
      </section>
      <footer className='card__footer'>
        <div>
          <button onClick={handleEdit} className='button__card'>
            <IconPen />
          </button>
          {!isEditing && (
            <button
              onClick={() =>
                card.archived
                  ? handleUnarchiveNote(card.id)
                  : handleArchiveNote(card.id)
              }
              className='button__card'
            >
              {card.archived ? <IconArchive /> : <IconUnarchive />}
            </button>
          )}
        </div>
        <div className='card__categories'>
          {card.categories.map(category => (
            <span className='card__category' key={category.id}>
              {category.name}
            </span>
          ))}
        </div>
        {isEditing && (
          <button className='button__cancel' onClick={handleCancel}>
            Cancel
          </button>
        )}
      </footer>
    </article>
  )
}
