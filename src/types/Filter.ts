import { ListItem } from '@/components/models'

export interface Filter {
  brand: string | null
  model: string | null
  yearFrom: string | null
  yearTo: string | null
  transmission: ListItem | null
  drive: ListItem | null
  engineType: ListItem | null
  engineСapacityFrom: number | null
  engineСapacityTo: number | null
  priceFrom: string | null
  priceTo: string | null
  mileageFrom: number | null
  mileageTo: number | null
}
