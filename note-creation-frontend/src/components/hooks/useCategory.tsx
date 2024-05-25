import { useState } from 'react'
import { useStore } from '../../context/useContext'
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi
} from '../../utils/api-service'
import { error } from '../../types/error-type'
import { CategoryType } from '../../types/categories-type'

export function useCategory() {
  const { setCategories } = useStore()
  const [categoryName, setCategoryName] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })

  const getAllCategories = async () => {
    try {
      const data = await getAllCategoriesApi()
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
      const data = await getAllCategoriesApi()
      setCategories(data)
      setCategoryName('')
    } catch (error: any) {
      setError(error)
    }
  }

  const handleUpdateCategory = async (category: CategoryType) => {
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')

    try {
      await updateCategoryApi(category)
      setSuccess(`Category updated`)
      const data = await getAllCategoriesApi()
      setCategories(data)
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
      const data = await getAllCategoriesApi()
      setCategories(data)
    } catch (error: any) {
      setError(error)
    }
  }

  return {
    categoryName,
    setCategoryName,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    getAllCategories,
    success,
    error
  }
}
