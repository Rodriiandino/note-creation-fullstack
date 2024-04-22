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
  setCardEditing: cardEditing => set({ cardEditing })
}))
