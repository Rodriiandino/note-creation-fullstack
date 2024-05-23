import './aside.css'
import { useEffect } from 'react'
import { useStore } from '../../context/useContext'
import { useCategory } from '../hooks/useCategory'
import SuccessError from '../success-error'
import { useNotes } from '../hooks/useNotes'

export default function CreateNoteForm() {
  const { categories, isEditing, cardEditing } = useStore()
  const {
    card,
    cardEdit,
    setCardEdit,
    handleCreateNote,
    handleUpdateNote,
    handleChanges
  } = useNotes()

  const { getAllCategories, error, success } = useCategory()

  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    if (isEditing) {
      setCardEdit({
        id: cardEditing?.id ?? 0,
        title: cardEditing?.title ?? '',
        content: cardEditing?.content ?? '',
        categories: cardEditing?.categories.map(cat => cat.name) ?? []
      })
    }
  }, [isEditing])

  return (
    <form
      className='aside__form'
      onSubmit={isEditing ? handleUpdateNote : handleCreateNote}
    >
      <div className='aside__form-group'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          placeholder={isEditing ? 'Edit your title' : 'Make a title'}
          value={isEditing ? cardEdit.title : card.title}
          onChange={e => handleChanges(e, isEditing ? 'edit' : 'create')}
          required
        />
      </div>
      <div className='aside__form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='content'
          placeholder={isEditing ? 'Edit your note' : 'Make a note'}
          value={isEditing ? cardEdit.content : card.content}
          onChange={e => handleChanges(e, isEditing ? 'edit' : 'create')}
          required
        ></textarea>
      </div>
      <div className='aside__form-group'>
        <label htmlFor='category'>Category</label>
        <div className='aside__checkbox-group'>
          {categories?.map(category => (
            <div key={category.id}>
              <input
                type='checkbox'
                id={category.name}
                value={category.name}
                onChange={e => handleChanges(e, isEditing ? 'edit' : 'create')}
                defaultChecked={
                  isEditing
                    ? cardEdit.categories.includes(category.name)
                    : false
                }
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}

          <SuccessError success={success} error={error} />
        </div>
      </div>
      <button type='submit'>{isEditing ? 'Edit' : 'Create'}</button>
    </form>
  )
}
