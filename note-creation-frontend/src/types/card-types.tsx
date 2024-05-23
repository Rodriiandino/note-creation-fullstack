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
  categories: string[]
}

export interface UpdateCard {
  id: number
  title: string
  content: string
  categories: string[]
}
