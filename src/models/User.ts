import { Role } from '@/models'

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
