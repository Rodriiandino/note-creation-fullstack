import { create } from 'zustand'
import { CardType } from '../types/card-types'
import { CategoryType } from '../types/categories-type'

type StoreType = {
  notes: CardType[]
  categories: CategoryType[]
  setNotes: (notes: CardType[]) => void
  setCategories: (categories: CategoryType[]) => void
  showArchive: 'all' | 'archived' | 'unarchive'
  setShowArchive: (showArchive: 'all' | 'archived' | 'unarchive') => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  cardEditing: CardType | null
  setCardEditing: (card: CardType | null) => void
  isEditingCategory: boolean
  setIsEditingCategory: (isEditingCategory: boolean) => void
  categoryEditing: CategoryType | null
  setCategoryEditing: (category: CategoryType | null) => void
}

export const useStore = create<StoreType>(set => ({
  notes: [],
  categories: [],
  setNotes: notes => set({ notes }),
  setCategories: categories => set({ categories }),
  showArchive: 'all',
  setShowArchive: showArchive => set({ showArchive }),
  isEditing: false,
  setIsEditing: isEditing => set({ isEditing }),
  cardEditing: null,
  setCardEditing: cardEditing => set({ cardEditing }),
  isEditingCategory: false,
  setIsEditingCategory: isEditingCategory => set({ isEditingCategory }),
  categoryEditing: null,
  setCategoryEditing: categoryEditing => set({ categoryEditing })
}))

type AuthStoreType = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
  isAuth: false,
  setIsAuth: isAuth => set({ isAuth })
}))
