<template>
  <div class="item">
    <div class="item-slider" @mouseleave="resetSlider(itemIndex)">
      <q-carousel v-if="item.images.length" v-model="itemSlideValue[itemIndex]">
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
      <div v-else class="default-car-image">
        <img src="src/assets/img/defaultcar.jpg" alt="Default image" />
      </div>
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

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.item {
  display: flex;
  border-radius: 10px;
  transition: all 0.1s linear;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba($color-gray, 0.15);
  }

  &-slider {
    flex: 0 0 280px;
    height: 180px;
    border-radius: 10px;
    margin-right: 10px;
    position: relative;
    &-nav {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 2px;
      opacity: 0;
      &-item {
        display: flex;
        align-items: end;
        flex-grow: 1;
        height: 100%;
        padding: 4px 0;
        margin: 0 2px;
        &::before {
          display: block;
          content: '';
          width: 100%;
          height: 4px;
          background-color: #c1c1c1;
          border-radius: $main-border-raius;
        }
        &.active::before {
          background-color: #3d87d2;
        }
      }
    }
    &-more {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0.35);
    }
    .q-carousel {
      height: 100%;
    }
  }

  &-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: $color-blue;
  }

  &-price {
    font-size: 1.15rem;
    font-weight: 600;
  }

  &-descr {
    color: rgba($color-gray-dark, 0.7);
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.item-slider:hover .item-slider-nav {
  opacity: 1;
}
</style>
