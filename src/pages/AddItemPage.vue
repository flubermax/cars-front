<template>
  <div>
    <h4>Новое объявление</h4>
    <a-input v-model:value="newItem.brand" placeholder="Basic usage" />
    <!-- <my-input v-model="newItem.name" placeholder="Название" /> -->
    <my-input v-model="newItem.price" placeholder="Цена" />
    <my-input v-model="newItem.mileage" placeholder="Пробег" />
    <!-- <my-input v-model="newItem.img" placeholder="Ссылка на фото" /> -->
    <textarea v-model="newItem.descr" cols="30" rows="10" placeholder="Описание"></textarea>
    <div>пишу тут: {{ newItem.brand }}</div>
    <my-button @click="addItem">добавить</my-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import { CarItem } from '@/types'

const newItem = ref<CarItem>({
  images: [],
  brand: '',
  model: '',
  color: '',
  engineType: 'gas',
  engineCapacity: 0,
  drive: 'FWD',
  enginePower: 0,
  transmission: 'MT',
  leftHandDrive: true,
  year: 2000,
  mileage: 0,
  price: 0,
  descr: '',
  guid: '',
  author: {
    name: '',
    avatar: '',
    phone: '',
  },
})

const addItem = () => {
  console.log('add item', newItem.value)
}
</script>

<style lang="scss"></style>
