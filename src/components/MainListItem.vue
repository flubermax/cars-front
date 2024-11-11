<template>
  <div>
    <div class="item-slider" @mouseleave="resetSlider(itemIndex)">
      <q-carousel v-model="itemSlideValue[itemIndex]">
        <q-carousel-slide
          v-for="(image, i) in item.images"
          :key="i"
          :name="i + 1"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          :img-src="`src/assets/img/cars/${image}`"
        />
      </q-carousel>
      <div v-if="showRemainsInfo(item.images, itemIndex)" class="item-slider-more">Ещё {{ getRemainsSlidersCount(item.images) }} фото</div>
      <div class="item-slider-nav" v-if="item.images.length > 1">
        <div
          :class="['item-slider-nav-item', isSliderItemActive(imgIndex, itemIndex)]"
          v-for="(navItem, imgIndex) in getSliderNav(item.images)"
          :key="imgIndex"
          @mouseover="setActiveSlide(imgIndex, itemIndex)"
        ></div>
      </div>
      <!-- <img :src="`src/assets/img/cars/${item.images[0]}`" :alt="item.brand" /> -->
    </div>
    <div class="flex-grow-1">
      <div class="row justify-between items-center">
        <div class="item-name">
          {{ getItemName(item) }}
        </div>
        <div v-if="isAuth" class="action-favBtn">
          <q-icon v-if="isFavorite(item)" name="favorite" @click.stop="removeFromFav(item)" />
          <q-icon v-else name="favorite_border" @click.stop="addToFav(item)" />
        </div>
      </div>

      <div class="item-price">{{ numberWithSpaces(item.price) }} ₽</div>
      <div class="item-mileage">
        {{ getItemInfo(item) }}
      </div>
      <div class="item-descr">
        {{ item.descr }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getItemInfo, numberWithSpaces, getItemName } from '@/utils/commons'
import { CarItem } from '@/types'
import { useUserStore } from '@/stores/user'
import { Attributes } from '@/components/models'

defineOptions({
  name: 'MainListItem',
})

type Props = {
  item: CarItem
  itemIndex: number
  itemSlideValue: Attributes
}

const props = defineProps<Props>()
const { item, itemIndex, itemSlideValue } = props

const userStore = useUserStore()
const { addToFav, removeFromFav } = userStore
const { favoritesCars, isAuth } = storeToRefs(userStore)

const sliderItemsCount = 5

function getRemainsSlidersCount(images: string[]) {
  return images.length - sliderItemsCount
}

function getSliderNav(images: string[]) {
  const navItems = images.slice(0, sliderItemsCount)
  return navItems
}

function setActiveSlide(imgIndex: number, itemIndex: number): void {
  itemSlideValue[itemIndex] = imgIndex + 1
}

function isSliderItemActive(imgIndex: number, itemIndex: number): string {
  return itemSlideValue[itemIndex] === imgIndex + 1 ? 'active' : ''
}

function resetSlider(itemIndex: number): void {
  itemSlideValue[itemIndex] = 1
}

function showRemainsInfo(images: string[], itemIndex: number): boolean {
  return itemSlideValue[itemIndex] == sliderItemsCount && images.length > sliderItemsCount
}

function isFavorite(item: CarItem) {
  return favoritesCars.value.map((car) => car.guid).includes(item.guid)
}
</script>

<style lang="scss"></style>
