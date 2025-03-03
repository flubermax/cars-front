import { Role } from '@/types'
export type Meta = {
  totalCount: number
}

export type ListItem = {
  type: string
  name: string
}

export type SlideAttributes = {
  [key: number]: number
}

export type ServerResult = {
  success: boolean
  message: string
  token?: string
  data?: unknown
}

export type User = {
  idf: string
  login: string
  password: string
  name: string
  location: string
  avatar: string
  phone: string
  favorites: string[]
  roles: Role[]
}
