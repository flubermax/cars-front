import { CarItem } from '@/types'
export type Meta = {
  totalCount: number
}

export type ListItem = {
  type: string
  name: string
}

export type Attributes = {
  [key: number]: number
}

export type ServerResult = {
  success: boolean
  type: string
  message: string
}

export type User = {
  login: string
  password: string
  name: string
  location: string
  avatar: string
  phone: string
  favorites: CarItem[]
}
