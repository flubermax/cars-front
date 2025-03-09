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
          <div v-else>
            <Sort :sortBy="sortBy" @update-sort="updateSort" />
            <MainPageItem
              v-for="(item, itemIndex) in items"
              :key="item.idf"
              :item="item"
              :itemIndex="itemIndex"
              :itemSlideValue="itemSlideValue"
              :mainMode="true"
              @click="router.push({ path: `/auto/${item.idf}` })"
            />
            <div v-show="totalPagesCount > 1" class="q-pa-lg flex flex-center">
              <q-pagination v-model="currentPage" color="black" :max="totalPagesCount" :max-pages="3" boundary-numbers />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CarItem, Filter, SlideAttributes } from '@/models'
import SideBar from '@/components/Sidebar.vue'
import MainPageItem from '@/components/CarItemFull.vue'
import Sort from '@/components/Sort.vue'

defineOptions({
  name: 'MainPage',
})

const router = useRouter()

let filter = ref(getDefaultFilter())
const items = ref<CarItem[]>([])

const isFilterChanged = computed(() => Object.keys(filter.value).some((key) => filter.value[key as keyof Filter]))
const isDataFiltered = ref(false)
const isLoading = ref(false)
const sortBy = ref('default')
const totalPagesCount = ref(1)
const currentPage = ref(1)
const currentLimit = ref(10)

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
    engineCapacityFrom: null,
    engineCapacityTo: null,
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
    const resp = await Api.post('car/', { filter: getFilterDto(), sortBy: sortBy.value, page: currentPage.value, limit: currentLimit.value })
    console.log(resp)
    if (resp.success) {
      items.value = [...resp.data.cars]
      totalPagesCount.value = resp.data.pagesCount
      isDataFiltered.value = isFilterChanged.value
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

function updateSort(newVal: string) {
  sortBy.value = newVal
  fetchCars()
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

watch(currentPage, () => {
  fetchCars()
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
