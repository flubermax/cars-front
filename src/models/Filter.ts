// import { CarOption } from '@/components/models'

export interface Filter {
  brand: string | null
  model: string | null
  yearFrom: string | null
  yearTo: string | null
  transmission: string | null
  drive: string | null
  engineType: string | null
  engineCapacityFrom: number | null
  engineCapacityTo: number | null
  priceFrom: string | null
  priceTo: string | null
  mileageFrom: number | null
  mileageTo: number | null
}
