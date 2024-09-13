type EngineType = 'gas' | 'diesel'
type DriveType = 'FWD' | 'RWD' | 'AWD'
type TransmissionType = 'MT' | 'AT' | 'CVT' | 'AMT'
type Author = {
  name: string
  avatar: string
  phone: string
}

export interface CarItem {
  images: string[]
  brand: string
  model: string
  color?: string
  engineType: EngineType
  engineCapacity: number
  drive: DriveType
  enginePower: number
  transmission: TransmissionType
  leftHandDrive: boolean
  year: number
  mileage: number
  price: number
  descr?: string
  guid?: string
  author: Author
}
