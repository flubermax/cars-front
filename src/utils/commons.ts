import { CarItem } from '@/types'
import { engines } from '@/constants/engine'
import { drives } from '@/constants/drive'
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

export function getItemInfo(item: CarItem): string {
  const carDrive = drives[item.drive].name.toLowerCase()
  const carEngine = engines[item.engineType].name.toLowerCase()
  return `${numberWithSpaces(item.mileage)} км, ${item.engineCapacity.toFixed(1)} ${item.transmission} (${
    item.enginePower
  } л.с.), ${carEngine}, ${carDrive} привод`
}

export function numberWithSpaces(val: string | number) {
  const newVal = String(val).replace(/\s+/g, '')
  return newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
