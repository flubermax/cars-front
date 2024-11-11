import { CarItem } from '@/types'
// import { engines } from '@/constants/engine'
// import { drives } from '@/constants/drive'
// import { transmissions } from '@/constants/transmission'

export function getMileage(value: number): string {
  const stringMileage = String(value)
  const mileageLength = stringMileage.length
  const carMileage =
    stringMileage.substring(0, mileageLength - 6) +
    ' ' +
    stringMileage.substring(mileageLength - 6, mileageLength - 3) +
    ' ' +
    stringMileage.substring(mileageLength - 3, mileageLength)
  return `${carMileage} км`
}

export function getItemName(item: CarItem) {
  return `${item.brand} ${item.model}, ${item.year}`
}

export function getItemInfo(item: CarItem): string {
  const carDrive = item.drive ? item.drive.name.toLowerCase() : ''
  const carEngine = item.engineType ? item.engineType.name.toLowerCase() : ''
  return `${item.mileage ? numberWithSpaces(item.mileage) : '0'} км, ${item.engineCapacity ? item.engineCapacity.toFixed(1) : '0'} ${
    item.transmission?.name
  } (${item.enginePower} л.с.), ${carEngine}, ${carDrive} привод`
}

export function numberWithSpaces(val: string | number) {
  const newVal = String(val).replace(/\s+/g, '')
  return newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
