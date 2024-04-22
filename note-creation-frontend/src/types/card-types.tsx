export interface CardType {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  archived: boolean
  user: {
    id: number
    username: string
  }
  categories: {
    id: number
    name: string
  }[]
}

export interface CreateCard {
  title: string
  content: string
  userId: number
  categories: string[]
}

export interface UpdateCard {
  title: string
  content: string
  categories: string[]
}
