<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <div class="q-mb-md">
        <MySelect
          v-model="filter.brand"
          :options="brandList"
          :disable="false"
          label="Марка"
          :changeAnyType="true"
          @update:model-value="emit(`resetModel`)"
        />
      </div>

      <div class="q-mb-md">
        <MySelect v-model="filter.model" :options="modelList" class="q-my-sm" label="Модель" :changeAnyType="true" :disable="!filter.brand" />
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Год выпуска</span>
        <div class="range-input">
          <MyInput v-model="filter.yearFrom" mask="####" placeholder="от" />
          <MyInput v-model="filter.yearTo" mask="####" placeholder="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Цена</span>
        <div class="range-input">
          <MyInput v-model="filter.priceFrom" placeholder="от" />
          <MyInput v-model="filter.priceTo" placeholder="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <MySelect v-model="filter.engineType" :options="engineList" label="Двигатель" />
      </div>

      <div class="q-mb-md">
        <MySelect v-model="filter.transmission" :options="transmissionList" label="Коробка передач" :changeAnyType="true" />
      </div>

      <div class="q-mb-md">
        <MySelect v-model="filter.drive" :options="driveList" label="Привод" />
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Объём двигателя</span>
        <div class="range-input">
          <MyInput v-model="filter.engineСapacityFrom" mask="#.#" placeholder="от" />
          <MyInput v-model="filter.engineСapacityTo" mask="#.#" placeholder="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Пробег</span>
        <div class="range-input">
          <MyInput v-model="filter.mileageFrom" mask="# ### ### ###" reverse-fill-mask placeholder="от" />
          <MyInput v-model="filter.mileageTo" mask="# ### ### ###" reverse-fill-mask placeholder="до" />
        </div>
      </div>

      <div class="row">
        <div class="col q-pr-xs">
          <q-btn class="full-width q-mr-md" color="primary" label="Показать" @click="emit(`filterData`)" :disabled="!isDataFiltered" />
        </div>
        <div class="col q-pl-xs">
          <q-btn class="full-width" label="Сбросить" @click="emit('resetFilter')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Filter } from '@/types'
import { MyInput, MySelect } from '@/components/UI'
import { brands } from '@/constants/brands'
import { engines } from '@/constants/engine'
import { drives } from '@/constants/drive'
import { transmissions } from '@/constants/transmission'
import { ListItem } from '@/components/models'
import { numberWithSpaces } from '@/utils/commons'

defineOptions({
  name: 'SideBar',
})

type Props = {
  filter: Filter
  isDataFiltered: boolean
}

const props = defineProps<Props>()
const filter = computed(() => props.filter)
const isDataFiltered = computed(() => props.isDataFiltered)

const emit = defineEmits<{
  (e: 'filterData'): void
  (e: 'resetFilter'): void
  (e: 'resetModel'): void
}>()

type Attributes = {
  [key: string]: string[]
}

function getAttributeValue<T extends Attributes>(obj: T, key: keyof T) {
  return obj[key]
}

// function formatPrice(e: Event, key: keyof Filter) {
// const newVal = numberWithSpaces((e.target as HTMLInputElement).value)
// }

// function getSelectedName() {
//   return filter.value.transmission;
// }

const brandList: string[] = Object.keys(brands)
const engineList: ListItem[] = Object.values(engines)
const transmissionList: ListItem[] = Object.values(transmissions)
const driveList: ListItem[] = Object.values(drives)
let modelList = ref<string[]>([])

watch(
  filter,
  async (newVal: Filter) => {
    if (newVal.brand) {
      modelList.value = getAttributeValue(brands, newVal.brand)
    } else {
      modelList.value = []
    }
    if (newVal.priceFrom) {
      newVal.priceFrom = numberWithSpaces(newVal.priceFrom)
    }
    if (newVal.priceTo) {
      newVal.priceTo = numberWithSpaces(newVal.priceTo)
    }
  },
  { deep: true }
)

onMounted(() => {
  // console.log(brands[Audi])
})
</script>

<style lang="scss">
.sidebar {
  flex: 0 0 300px;
  padding: 10px 0;
  position: relative;
  &-inner {
    position: sticky;
    top: 15px;
  }
}
</style>
