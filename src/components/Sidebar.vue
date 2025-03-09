<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <div class="q-mb-md">
        <MySelect
          v-model="filter.brand"
          :options="brandList"
          :disable="false"
          label="Марка"
          selectedLabel="Любая"
          @update:model-value="emit(`resetModel`)"
        />
      </div>

      <div class="q-mb-md">
        <MySelect v-model="filter.model" :options="modelList" class="q-my-sm" label="Модель" selectedLabel="Любая" :disable="!filter.brand" />
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Год выпуска</span>
        <div class="range-input">
          <MyInput v-model="filter.yearFrom" mask="####" placeholder="от" />
          <MyInput v-model="filter.yearTo" mask="####" placeholder="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Цена, ₽</span>
        <div class="range-input">
          <MyInput v-model="filter.priceFrom" placeholder="от" />
          <MyInput v-model="filter.priceTo" placeholder="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="filter.engineType"
          :options="engineList"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          label="Двигатель"
          selectedLabel="Любой"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="filter.transmission"
          :options="transmissionList"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          label="Коробка передач"
          selectedLabel="Любая"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="filter.drive"
          :options="driveList"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          label="Привод"
          selectedLabel="Любой"
        />
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Объём двигателя, л</span>
        <div class="range-input">
          <!-- <MyInput v-model="filter.engineCapacityFrom" mask="#.#" reverse-fill-mask placeholder="от" />
          <MyInput v-model="filter.engineCapacityTo" mask="#.#" reverse-fill-mask placeholder="до" /> -->
          <MySelect v-model="filter.engineCapacityFrom" :options="engineСapacityListFrom" selectedLabel="от" />
          <MySelect v-model="filter.engineCapacityTo" :options="engineСapacityListTo" selectedLabel="до" />
        </div>
      </div>

      <div class="q-mb-md">
        <span class="form-control-label">Пробег, км</span>
        <div class="range-input">
          <MyInput v-model="filter.mileageFrom" mask="# ### ### ###" reverse-fill-mask placeholder="от" />
          <MyInput v-model="filter.mileageTo" mask="# ### ### ###" reverse-fill-mask placeholder="до" />
        </div>
      </div>

      <div class="row">
        <div class="col q-pr-xs">
          <q-btn
            class="full-width q-mr-md"
            color="primary"
            label="Показать"
            @click="emit(`fetchCars`)"
            :disabled="!isFilterChanged && !isDataFiltered"
          />
        </div>
        <div class="col q-pl-xs">
          <q-btn class="full-width" label="Сбросить" :disabled="!isFilterChanged && !isDataFiltered" @click="resetFilter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Filter } from '@/models'
import { MyInput, MySelect } from '@/components/UI'
import { brands, transmissionList, engineList, engineСapacityList, driveList } from '@/constants'
import { numberWithSpaces, getAttributeValue } from '@/utils/commons'

defineOptions({
  name: 'SideBar',
})

type Props = {
  filter: Filter
  isDataFiltered: boolean
  isFilterChanged: boolean
}

const props = defineProps<Props>()
const filter = computed(() => props.filter)
const isDataFiltered = computed(() => props.isDataFiltered)
const isFilterChanged = computed(() => props.isFilterChanged)

const emit = defineEmits<{
  (e: 'fetchCars'): void
  (e: 'resetFilter'): void
  (e: 'resetModel'): void
}>()

// function formatPrice(e: Event, key: keyof Filter) {
// const newVal = numberWithSpaces((e.target as HTMLInputElement).value)
// }

// function getSelectedName() {
//   return filter.value.transmission;
// }

const brandList: string[] = Object.keys(brands)
let modelList = ref<string[]>([])
const engineСapacityListFrom = computed(() => {
  if (filter.value.engineCapacityTo) {
    return engineСapacityList.filter((item) => item <= Number(filter.value.engineCapacityTo))
  }
  return engineСapacityList
})
const engineСapacityListTo = computed(() => {
  if (filter.value.engineCapacityFrom) {
    return engineСapacityList.filter((item) => item >= Number(filter.value.engineCapacityFrom))
  }
  return engineСapacityList
})

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
    // if (newVal.engineCapacityFrom) {
    //   console.log(newVal.engineCapacityFrom, String(newVal.engineCapacityFrom).length)
    // }
  },
  { deep: true }
)

async function resetFilter() {
  emit('resetFilter')
}

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
