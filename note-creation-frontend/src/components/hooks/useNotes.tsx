import { useState } from 'react'
import { useStore } from '../../context/useContext'
import { error } from '../../types/error-type'
import { CreateCard, UpdateCard } from '../../types/card-types'
import {
  createCardApi,
  getCardUserApi,
  updateCardApi
} from '../../utils/api-service'

export function useNotes() {
  const { setNotes, setIsEditing } = useStore()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })
  const [card, setCard] = useState<CreateCard>({
    title: '',
    content: '',
    categories: []
  })
  const [cardEdit, setCardEdit] = useState<UpdateCard>({
    id: 0,
    title: '',
    content: '',
    categories: []
  })

  const handleChanges = (e: any, type: 'create' | 'edit') => {
    const { id, value, checked } = e.target
    if (id === 'title' || id === 'content') {
      if (type === 'create') {
        setCard({ ...card, [id]: value })
      } else {
        setCardEdit({ ...cardEdit, [id]: value })
      }
    } else {
      if (checked) {
        if (type === 'create') {
          setCard({ ...card, categories: [...card.categories, value] })
        } else {
          setCardEdit({
            ...cardEdit,
            categories: [...cardEdit.categories, value]
          })
        }
      } else {
        if (type === 'create') {
          setCard({
            ...card,
            categories: card.categories.filter(category => category !== value)
          })
        } else {
          setCardEdit({
            ...cardEdit,
            categories: cardEdit.categories.filter(
              category => category !== value
            )
          })
        }
      }
    }
  }

  const getUserNotes = async () => {
    try {
      const data = await getCardUserApi()
      setNotes(data)
      return data
    } catch (error: any) {
      setError(error)
    }
  }

  const handleCreateNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      await createCardApi(card)

      setSuccess('Note created')
      const data = await getCardUserApi()
      setNotes(data)
    } catch (error: any) {
      setError(error)
    }
  }

  const handleUpdateNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      await updateCardApi(cardEdit)
      setSuccess('Note updated')
      const data = await getCardUserApi()
      setNotes(data)
      setIsEditing(false)
    } catch (error: any) {
      setError(error)
    }
  }

  return {
    card,
    setCard,
    cardEdit,
    setCardEdit,
    success,
    error,
    handleCreateNote,
    handleUpdateNote,
    handleChanges,
    getUserNotes
  }
}
