import { register, login } from '../types/account-types'
import { CategoryType, CreateCategory } from '../types/categories-type'
import { CreateCard, UpdateCard } from '../types/card-types'
import fetchApi from './fetch-api'

export const registerUserApi = async (user: register) => {
  const response = await fetchApi({
    path: '/auth/register',
    method: 'POST',
    body: user,
    authorization: false
  })

  return response
}

export const loginUserApi = async (user: login) => {
  const response = await fetchApi({
    path: '/auth/login',
    method: 'POST',
    body: user,
    authorization: false
  })

  return response
}

export const createCategoryApi = async (category: CreateCategory) => {
  const response = await fetchApi({
    path: '/categories/create',
    method: 'POST',
    body: category
  })

  return response
}

export const getUserCategoriesApi = async () => {
  const response = await fetchApi({ path: '/categories/user' })

  return response
}

export const deleteCategoryApi = async (categoryId: number) => {
  const response = await fetchApi({
    path: `/categories/${categoryId}`,
    method: 'DELETE'
  })

  return response
}

export const updateCategoryApi = async (category: CategoryType) => {
  const response = await fetchApi({
    path: `/categories/${category.id}`,
    method: 'PUT',
    body: category.name
  })

  return response
}

export const getUserCardApi = async () => {
  const response = await fetchApi({ path: '/notes/user' })

  return response
}

export const createCardApi = async (card: CreateCard) => {
  const response = await fetchApi({
    path: '/notes/create',
    method: 'POST',
    body: card
  })

  return response
}

export const updateCardApi = async (card: UpdateCard) => {
  const response = await fetchApi({
    path: `/notes/${card.id}`,
    method: 'PUT',
    body: {
      title: card.title,
      content: card.content,
      categories: card.categories
    }
  })

  return response
}

export const deleteCardApi = async (cardId: number) => {
  const response = await fetchApi({
    path: `/notes/${cardId}`,
    method: 'DELETE'
  })

  return response
}

export const archiveCardApi = async (cardId: number) => {
  const response = await fetchApi({
    path: `/notes/archive/${cardId}`,
    method: 'POST'
  })

  return response
}

export const unarchiveCardApi = async (cardId: number) => {
  const response = await fetchApi({
    path: `/notes/unarchive/${cardId}`,
    method: 'POST'
  })

  return response
}

export const getArchivedUserCardsApi = async () => {
  const response = await fetchApi({ path: '/notes/user/archived' })

  return response
}

export const getUnarchivedUserCardsApi = async () => {
  const response = await fetchApi({ path: '/notes/user/unarchived' })

  return response
}
