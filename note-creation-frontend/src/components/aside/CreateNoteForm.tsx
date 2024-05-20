import './aside.css'
import { useState, useEffect } from 'react'
import fetchApi from '../../utils/fetch-api'
import { CreateCard, UpdateCard } from '../../types/card-types'
import { useStore } from '../../context/useContext'

export default function CreateNoteForm() {
  const {
    categories,
    setCategories,
    setNotes,
    isEditing,
    cardEditing,
    setIsEditing
  } = useStore()
  const [card, setCard] = useState<CreateCard>({
    title: '',
    content: '',
    categories: []
  })
  const [cardEdit, setCardEdit] = useState<UpdateCard>({
    title: '',
    content: '',
    categories: []
  })

  useEffect(() => {
    fetchApi({ path: '/categories/all' }).then(data => {
      setCategories(data)
    })
  }, [])

  const handleChanges = (e: any) => {
    const { id, value, checked } = e.target
    if (id === 'title' || id === 'content') {
      setCard({ ...card, [id]: value })
    } else {
      if (checked) {
        setCard({ ...card, categories: [...card.categories, value] })
      } else {
        setCard({
          ...card,
          categories: card.categories.filter(category => category !== value)
        })
      }
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await fetchApi({
      path: '/notes/create',
      method: 'POST',
      body: card
    })
    setCard({
      title: '',
      content: '',
      categories: []
    })

    const data = await fetchApi({ path: '/notes/all' })
    setNotes(data)
  }

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await fetchApi({
      path: `/notes/${cardEditing?.id}`,
      method: 'PUT',
      body: cardEdit
    })
    const data = await fetchApi({ path: '/notes/all' })
    setNotes(data)
    setIsEditing(false)
  }

  const handleEditChanges = (e: any) => {
    const { id, value, checked } = e.target
    if (id === 'title' || id === 'content') {
      setCardEdit({ ...cardEdit, [id]: value })
    } else {
      if (checked) {
        setCardEdit({
          ...cardEdit,
          categories: [...cardEdit.categories, value]
        })
      } else {
        setCardEdit({
          ...cardEdit,
          categories: cardEdit.categories.filter(category => category !== value)
        })
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      setCardEdit({
        title: cardEditing?.title ?? '',
        content: cardEditing?.content ?? '',
        categories: cardEditing?.categories.map(cat => cat.name) ?? []
      })
    }
  }, [isEditing])

  return (
    <form className='aside__form'>
      <div className='aside__form-group'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          placeholder={isEditing ? 'Edit your title' : 'Make a title'}
          value={isEditing ? cardEdit.title : card.title}
          onChange={isEditing ? handleEditChanges : handleChanges}
          required
        />
      </div>
      <div className='aside__form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='content'
          placeholder={isEditing ? 'Edit your note' : 'Make a note'}
          value={isEditing ? cardEdit.content : card.content}
          onChange={isEditing ? handleEditChanges : handleChanges}
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
                onChange={isEditing ? handleEditChanges : handleChanges}
                defaultChecked={
                  isEditing
                    ? cardEdit.categories.includes(category.name)
                    : false
                }
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <button type='submit' onClick={isEditing ? handleEdit : handleSubmit}>
        {isEditing ? 'Edit' : 'Create'}
      </button>
    </form>
  )
}
