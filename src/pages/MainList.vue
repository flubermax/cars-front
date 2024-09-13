<template>
  <q-page>
    <div class="container row no-wrap">
      <SideBar :filter="filter" :isDataFiltered="isDataFiltered" @filterData="filterData" @resetFilter="resetFilter" @resetModel="resetModel" />
      <div class="content">
        <div class="searchResult-empty" v-if="isDataFiltered && !tableData.length">По вашему запросу нет результатов</div>
        <div v-for="(item, itemIndex) in tableData" :key="item.guid" class="item" @click="router.push({ path: `/auto/${item.guid}` })">
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
          <div>
            <div class="item-name">
              {{ getItemName(item) }}
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { autoMock } from '@/mock'
import SideBar from '@/components/Sidebar.vue'
import { CarItem, Filter } from '@/types'
// import { ListItem } from '@/components/models';
// import { transmissions } from '@/constants/transmission'
// import { engines } from '@/constants/engine'
// import { drives } from '@/constants/drive'
import { getItemInfo, numberWithSpaces } from '@/utils/commons'

defineOptions({
  name: 'MainList',
})

const router = useRouter()

let filter = ref(getDefaultFilter())

const tableData = ref([...autoMock])

const isDataFiltered = computed(() => Object.keys(filter.value).some((key) => filter.value[key as keyof Filter]))

type Attributes = {
  [key: number]: number
}

const sliderItemsCount = 5

const itemSlideValue = ref<Attributes>({})
onMounted(() => {
  autoMock.forEach((car, i) => {
    if (car.guid) {
      itemSlideValue.value[i] = 1
    }
  })
})

function getRemainsSlidersCount(images: string[]) {
  return images.length - sliderItemsCount
}

function getSliderNav(images: string[]) {
  const navItems = images.slice(0, sliderItemsCount)
  return navItems
}

function setActiveSlide(imgIndex: number, itemIndex: number): void {
  itemSlideValue.value[itemIndex] = imgIndex + 1
}

function isSliderItemActive(imgIndex: number, itemIndex: number): string {
  return itemSlideValue.value[itemIndex] === imgIndex + 1 ? 'active' : ''
}

function resetSlider(itemIndex: number): void {
  itemSlideValue.value[itemIndex] = 1
}

function showRemainsInfo(images: string[], itemIndex: number): boolean {
  return itemSlideValue.value[itemIndex] == sliderItemsCount && images.length > sliderItemsCount
}

// interface MyObject<T> {
//   [index: string]: T
// }

function getDefaultFilter(): Filter {
  return {
    brand: null,
    model: null,
    yearFrom: null,
    yearTo: null,
    transmission: null,
    drive: null,
    engineType: null,
    engineСapacityFrom: null,
    engineСapacityTo: null,
    priceFrom: null,
    priceTo: null,
    mileageFrom: null,
    mileageTo: null,
  }
}

function getItemName(item: CarItem) {
  return `${item.brand} ${item.model}, ${item.year}`
}

// for obj[key] : solution 1 - when the type of the object is known
// const temp = someObj[field as keyof ObjectType]
// Solution 2 - when the type of the object is not known
// const temp = someObj[field as keyof typeof someObj]

function filterData(): void {
  let data = autoMock
  for (let key in filter.value) {
    const val = filter.value[key as keyof Filter]

    if (val && val !== 'all') {
      switch (key) {
        case 'brand':
        case 'model':
          data = data.filter((item) => item[key as keyof CarItem] === val)
          break
        case 'transmission':
        case 'drive':
        case 'engineType':
          if (typeof val === 'object') {
            data = data.filter((item) => item[key as keyof CarItem] === val.type)
            break
          }
        case 'yearFrom':
          data = data.filter((item) => item.year >= Number(val))
          break
        case 'yearTo':
          data = data.filter((item) => item.year <= Number(val))
          break
        case 'engineСapacityFrom':
          data = data.filter((item) => item.engineCapacity >= Number(val))
          break
        case 'engineСapacityTo':
          data = data.filter((item) => item.engineCapacity <= Number(val))
          break
        case 'priceFrom':
          if (typeof val === 'string') {
            data = data.filter((item) => item.price >= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'priceTo':
          if (typeof val === 'string') {
            data = data.filter((item) => item.price <= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'mileageFrom':
          if (typeof val === 'string') {
            data = data.filter((item) => item.mileage >= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'mileageTo':
          if (typeof val === 'string') {
            data = data.filter((item) => item.mileage <= Number(val.replace(/\s+/g, '')))
          }
          break
        default:
          data = autoMock
      }
    }
  }
  tableData.value = data
}

function resetFilter(): void {
  filter.value = getDefaultFilter()
  tableData.value = autoMock
}

function resetModel(): void {
  filter.value.model = null
}

// function imagePath(img) {
//   return require(`@/assets/img/cars/${img}`);
// }
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
.content {
  flex-grow: 1;
  padding: 10px 0 10px 20px;
}

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

.searchResult-empty {
  font-size: 1.25rem;
  text-align: center;
  padding: 2rem 0 0;
}
</style>
