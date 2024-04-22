import { IconArchive, IconUnarchive, IconTrash, IconPen } from './icons-section'
import { CardType } from '../../types/card-types'
import fetchApi from '../../utils/fetch-api'
import { useStore } from '../../context/useContext'

export default function Card({ card }: { card: CardType }) {
  const { setNotes, setIsEditing, cardEditing, setCardEditing, isEditing } =
    useStore()

  const fetchApiAndSetNotes = async () => {
    const data = await fetchApi({ path: '/notes/all' })
    setNotes(data)
  }

  const handleArchive = async () => {
    await fetchApi({ path: `/notes/archive/${card.id}`, method: 'POST' })
    fetchApiAndSetNotes()
  }

  const handleUnarchive = async () => {
    await fetchApi({ path: `/notes/unarchive/${card.id}`, method: 'POST' })
    fetchApiAndSetNotes()
  }

  const handleDelete = async () => {
    await fetchApi({ path: `/notes/${card.id}`, method: 'DELETE' })
    fetchApiAndSetNotes()
  }

  const handleEdit = () => {
    if (cardEditing?.id !== card.id) {
      setIsEditing(true)
      setCardEditing(card)
    }
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
          <button onClick={handleDelete} className='button__card'>
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
              onClick={card.archived ? handleUnarchive : handleArchive}
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
