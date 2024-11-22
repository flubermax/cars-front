<template>
  <q-page>
    <div class="container row no-wrap">
      <SideBar
        :filter="filter"
        :isFilterChanged="isFilterChanged"
        :isDataFiltered="isDataFiltered"
        @filterData="filterData"
        @resetFilter="resetFilter"
        @resetModel="resetModel"
      />
      <div class="content">
        <div class="searchResult-empty" v-if="isDataFiltered && !tableData.length">По вашему запросу нет результатов</div>
        <MainListItem
          v-for="(item, itemIndex) in tableData"
          :key="item.guid"
          :item="item"
          :itemIndex="itemIndex"
          :itemSlideValue="itemSlideValue"
          @click="router.push({ path: `/auto/${item.guid}` })"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '@/components/Sidebar.vue'
import MainListItem from '@/components/MainListItem.vue'
import { CarItem, Filter } from '@/types'
import { storeToRefs } from 'pinia'
import { useCarsStore } from '@/stores/cars'
import { Attributes } from '@/components/models'

defineOptions({
  name: 'MainList',
})

const router = useRouter()

let filter = ref(getDefaultFilter())

const carsStore = useCarsStore()
const { items } = storeToRefs(carsStore)
const tableData = ref<CarItem[]>([...items.value])

const isFilterChanged = computed(() => Object.keys(filter.value).some((key) => filter.value[key as keyof Filter]))
const isDataFiltered = ref(false)

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

// for obj[key] : solution 1 - when the type of the object is known
// const temp = someObj[field as keyof ObjectType]
// Solution 2 - when the type of the object is not known
// const temp = someObj[field as keyof typeof someObj]

function filterData(): void {
  let data = items.value
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
          data = data.filter((item) => Number(item.year) >= Number(val))
          break
        case 'yearTo':
          data = data.filter((item) => Number(item.year) <= Number(val))
          break
        case 'engineСapacityFrom':
          data = data.filter((item) => Number(item.engineCapacity) >= Number(val))
          break
        case 'engineСapacityTo':
          data = data.filter((item) => Number(item.engineCapacity) <= Number(val))
          break
        case 'priceFrom':
          if (typeof val === 'string') {
            data = data.filter((item) => Number(item.price) >= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'priceTo':
          if (typeof val === 'string') {
            data = data.filter((item: CarItem) => Number(item.price) <= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'mileageFrom':
          if (typeof val === 'string') {
            data = data.filter((item) => Number(item.mileage) >= Number(val.replace(/\s+/g, '')))
          }
          break
        case 'mileageTo':
          if (typeof val === 'string') {
            data = data.filter((item) => Number(item.mileage) <= Number(val.replace(/\s+/g, '')))
          }
          break
        default:
          data = items.value
      }
    }
  }
  tableData.value = data
  isDataFiltered.value = true
}

function resetFilter(): void {
  filter.value = getDefaultFilter()
  if (isDataFiltered.value) {
    tableData.value = items.value
    isDataFiltered.value = false
  }
}

function resetModel(): void {
  filter.value.model = null
}

const itemSlideValue = ref<Attributes>({})

onMounted(() => {
  items.value.forEach((car, i) => {
    if (car.guid) {
      itemSlideValue.value[i] = 1
    }
  })
})

// function imagePath(img) {
//   return require(`@/assets/img/cars/${img}`);
// }
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';
.content {
  flex-grow: 1;
  padding: 10px 0 10px 20px;
}

.searchResult-empty {
  font-size: 1.25rem;
  text-align: center;
  padding: 2rem 0 0;
}
</style>
