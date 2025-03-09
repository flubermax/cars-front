import { CarItem } from './CarItem'
import { Filter } from './Filter'
import { Author } from './Author'
import { ServerResult } from './ServerResult'
import { User } from './User'

export type DriveType = 'FWD' | 'RWD' | 'AWD'
export type EngineType = 'gas' | 'diesel'
export type TransmissionType = 'MT' | 'AT' | 'CVT' | 'AMT'

export type SlideAttributes = {
  [key: number]: number
}

export type CarOption = {
  type: string
  name: string
}

export type Role = 'USER' | 'ADMIN'

export type Attributes = {
  [key: string]: unknown
}
// <T extends Attributes>(obj: T, key: keyof T)

export type { CarItem, Filter, Author, ServerResult, User }
