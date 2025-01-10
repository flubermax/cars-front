<template>
  <q-page>
    <div class="container row no-wrap">
      <SideBar
        :filter="filter"
        :isFilterChanged="isFilterChanged"
        :isDataFiltered="isDataFiltered"
        @fetchCars="fetchCars"
        @resetFilter="resetFilter"
        @resetModel="resetModel"
      />
      <div class="content">
        <div v-if="isLoading">Идёт загрузка...</div>
        <div v-else>
          <div class="searchResult-empty" v-if="isDataFiltered && !items.length">По вашему запросу нет результатов</div>
          <MainPageItem
            v-for="(item, itemIndex) in items"
            :key="item.idf"
            :item="item"
            :itemIndex="itemIndex"
            :itemSlideValue="itemSlideValue"
            :mainMode="true"
            @click="router.push({ path: `/auto/${item.idf}` })"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '@/components/Sidebar.vue'
import MainPageItem from '@/components/MainPageItem.vue'
import { CarItem, Filter } from '@/types'
import { SlideAttributes } from '@/components/models'

defineOptions({
  name: 'MainPage',
})

const router = useRouter()

let filter = ref(getDefaultFilter())
const items = ref<CarItem[]>([])

const isFilterChanged = computed(() => Object.keys(filter.value).some((key) => filter.value[key as keyof Filter]))
const isDataFiltered = ref(false)
const isLoading = ref(false)

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

type Attributes = {
  [key: string]: unknown
}

function getFilterDto(): Attributes {
  return filter.value
}

async function fetchCars() {
  try {
    isLoading.value = true
    const resp = await Api.post('car/', getFilterDto())
    console.log(resp)
    if (resp.success) {
      items.value = [...resp.data]
      isDataFiltered.value = isFilterChanged.value
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

// for obj[key] : solution 1 - when the type of the object is known
// const temp = someObj[field as keyof ObjectType]
// Solution 2 - when the type of the object is not known
// const temp = someObj[field as keyof typeof someObj]

function resetFilter(): void {
  filter.value = getDefaultFilter()
  if (isDataFiltered.value) {
    fetchCars()
    isDataFiltered.value = false
  }
}

function resetModel(): void {
  filter.value.model = null
}

const itemSlideValue = ref<SlideAttributes>({})

onMounted(async () => {
  await fetchCars()
  items.value.forEach((car, i) => {
    if (car.idf) {
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
