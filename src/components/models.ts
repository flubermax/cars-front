export interface Meta {
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
