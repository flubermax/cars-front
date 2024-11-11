import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CarItem } from '@/types'
import { autoMock } from '@/mock'

export const useCarsStore = defineStore('carsStore', () => {
  const items = ref<CarItem[]>([...autoMock])

  const addItem = (newItem: CarItem): void => {
    items.value.push(newItem)
  }

  // const removeItem = (guid: string): void => {
  //   items.value = items.value.filter((item) => item.guid !== guid)
  // }

  return { items, addItem }
})
