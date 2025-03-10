// import { Author } from './Author'
// import { CarOption } from './CarOption'

export interface CarItem {
  images: string[]
  brand: string | null
  model: string | null
  color: string | null
  engineType: string | null
  engineCapacity: number | null
  drive: string | null
  enginePower: number | null
  transmission: string | null
  leftHandDrive: boolean | null
  year: number | null
  mileage: number | null
  price: number | null
  descr: string
  idf: string
  createDate: number
  changeDate: number
  authorIdf: string
  authorName: string
  authorAvatar: string
  authorPhone: string
  authorLocation: string
}
