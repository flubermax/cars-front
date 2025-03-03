import { CarItem } from '@/types'
import assert from 'assert'
// const assert = require('assert')
import { engineList } from '@/constants/engines'
import { driveList } from '@/constants/drives'
// import { transmissionList } from '@/constants/transmissions'

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
  const carDrive = driveList.find((el) => el.type === item.drive)
  const carEngine = engineList.find((el) => el.type === item.engineType)
  return `${item.mileage ? numberWithSpaces(item.mileage) : '0'} км, ${item.engineCapacity ? item.engineCapacity.toFixed(1) : '0'} ${
    item.transmission
  } (${item.enginePower} л.с.), ${carEngine ? carEngine.name.toLowerCase() : ''}, ${carDrive ? carDrive.name.toLowerCase() : ''} привод`
}

export function numberWithSpaces(val: string | number) {
  const newVal = String(val).replace(/\s+/g, '')
  return newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function capitalizeFirstLetter(val: string) {
  if (val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  } else {
    return val
  }
}

export const deepEqualCheck = <T>(actual: T, expected: T) => {
  let isEqual

  try {
    assert.deepStrictEqual(actual, expected)
    isEqual = true
  } catch (error) {
    isEqual = false
  }

  return isEqual
}

export const getImagesPath = (file: File) => {
  const path = URL.createObjectURL(file)
  // let reader = new FileReader()
  // reader.onload = (event) => {
  //   if (event.target && typeof event.target.result === 'string') {
  //     path = event.target.result
  //   }
  // }
  // reader.readAsDataURL(file)
  return path
}

export const getImgSrc = (fileName: string) => {
  return `http://localhost:8088/${fileName}`
}
