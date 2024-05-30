import { useEffect } from 'react'
import SuccessError from '../../success-error'
import { useNotes } from '../../hooks/useNotes'
import { CategoryType } from '../../../types/categories-type'
import { IconPen, IconTrash } from '../../icons'
import { useStore } from '../../../context/useContext'
import { useCategory } from '../../hooks/useCategory'

export default function CreateNoteForm() {
  const {
    categories,
    isEditing,
    cardEditing,
    setIsEditingCategory,
    setCategoryEditing
  } = useStore()
  const {
    card,
    cardEdit,
    setCardEdit,
    handleCreateNote,
    handleUpdateNote,
    handleChanges,
    success: noteSuccess,
    error: noteError
  } = useNotes()

  const { getAllCategories, error, success, handleDeleteCategory } =
    useCategory()

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

  const handleEditCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: CategoryType
  ) => {
    e.preventDefault()
    setCategoryEditing(category)
    setIsEditingCategory(true)
  }

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
          {categories == null && (
            <p>No categories available. Create one first</p>
          )}
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
              <div className='checkbox__actions'>
                <button onClick={e => handleEditCategory(e, category)}>
                  <IconPen />
                </button>
                <button onClick={e => handleDeleteCategory(e, category.id)}>
                  <IconTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button type='submit'>{isEditing ? 'Edit' : 'Create'}</button>
      <SuccessError success={success} error={error} />
      <SuccessError success={noteSuccess} error={noteError} />
    </form>
  )
}
