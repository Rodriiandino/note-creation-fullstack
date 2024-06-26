import { useState } from 'react'
import { useStore } from '../../context/useContext'
import {
  createCategoryApi,
  deleteCategoryApi,
  getUserCardApi,
  getUserCategoriesApi,
  updateCategoryApi
} from '../../utils/api-service'
import { error } from '../../types/error-type'

export function useCategory() {
  const {
    setCategories,
    setIsEditingCategory,
    categoryEditing,
    setCategoryEditing,
    setNotes
  } = useStore()
  const [categoryName, setCategoryName] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })

  const handleChanges = (e: any, type: 'create' | 'edit') => {
    const { value } = e.target
    if (type === 'create') {
      setCategoryName(value)
    } else {
      if (!categoryEditing) return
      setCategoryEditing({
        ...categoryEditing,
        name: value
      })
    }
  }

  const getAllCategories = async () => {
    try {
      const data = await getUserCategoriesApi()
      setCategories(data)
    } catch (error: any) {
      setError(error)
    }
  }

  const handleCreateCategory = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      await createCategoryApi({
        name: categoryName
      })

      setSuccess(`Category '${categoryName}' created`)
      const data = await getUserCategoriesApi()
      setCategories(data)
      setCategoryName('')
    } catch (error: any) {
      setError(error)
    }
  }

  const handleUpdateCategory = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      if (!categoryEditing) return
      await updateCategoryApi(categoryEditing)
      setSuccess(`Category updated`)
      const data = await getUserCategoriesApi()
      setCategories(data)
      setIsEditingCategory(false)
      setCategoryEditing(null)
      const dataNote = await getUserCardApi()
      setNotes(dataNote)
    } catch (error: any) {
      setError(error)
    }
  }

  const handleDeleteCategory = async (
    e: { preventDefault: () => void },
    categoryId: number
  ) => {
    e.preventDefault()
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      await deleteCategoryApi(categoryId)
      setSuccess('Category deleted')
      const data = await getUserCategoriesApi()
      setCategories(data)
    } catch (error: any) {
      setError(error)
    }
  }

  return {
    categoryName,
    handleChanges,
    setCategoryName,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    getAllCategories,
    success,
    error
  }
}
