import { Author } from './Author'
import { CarProp } from './CarProp'
// import { EngineType } from './EngineType'
// import { DriveType } from './DriveType'
// import { TransmissionType } from './TransmissionType'

// type EngineType = 'gas' | 'diesel'
// type DriveType = 'FWD' | 'RWD' | 'AWD'
// type TransmissionType = 'MT' | 'AT' | 'CVT' | 'AMT'

export interface CarItem {
  images: string[]
  brand: string | null
  model: string | null
  color?: string | null
  engineType: CarProp | null
  engineCapacity: number | null
  drive: CarProp | null
  enginePower: number | null
  transmission: CarProp | null
  leftHandDrive: boolean | null
  year: number | null
  mileage: number | null
  price: string
  descr: string
  guid: string
  author: Author
}
