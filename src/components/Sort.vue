<template>
  <div class="sort">
    <span class="sort-span text-gray q-mr-xs">Сортировать по</span>
    <q-btn class="sort-btn" color="white" text-color="black" flat no-caps>
      <i :class="['q-mr-xs bi', currentSort?.icon]"></i>
      <span>{{ currentSort?.label }}</span>
      <q-menu v-model="showPopup" transition-show="jump-down" transition-hide="jump-up">
        <q-list style="min-width: 100px">
          <q-item
            v-for="item in sortList"
            :key="item.sort"
            :class="['sort-item', isItemActive(item) ? 'sort-item--active' : '']"
            clickable
            @click.stop="sortHanlder(item)"
          >
            <q-item-section>
              <div class="sort-item-inner">
                <i :class="['q-mr-xs bi', item.icon]"></i> <span class="q-pl-xs">{{ item.label }}</span>
              </div>
              <i v-if="isItemActive(item)" class="bi bi-check"></i>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'SortComp',
})

type Props = {
  sortBy: string
}

const props = defineProps<Props>()
const sortBy = computed(() => props.sortBy)

type Emits = {
  (e: 'updateSort', value: Props['sortBy']): void
}

const emit = defineEmits<Emits>()

type SortOption = {
  icon: string
  label: string
  sort: string
}

const sortList = [
  {
    icon: 'bi-list',
    label: 'умолчанию',
    sort: 'default',
  },
  {
    icon: 'bi-calendar',
    label: 'дате добавления',
    sort: 'date',
  },
  {
    icon: 'bi-sort-down-alt',
    label: 'возрастанию цены',
    sort: 'price-min',
  },
  {
    icon: 'bi-sort-down',
    label: 'убыванию цены',
    sort: 'price-max',
  },
]
let currentSort = computed(() => sortList.find((item) => item.sort === sortBy.value))
let showPopup = ref(false)

function sortHanlder(value: SortOption) {
  showPopup.value = false
  emit('updateSort', value.sort)
}

function isItemActive(item: SortOption) {
  return item.sort === currentSort.value?.sort
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
.sort {
  display: flex;
  align-items: center;
  padding: 0 10px;
  &-span {
    padding-bottom: 2px;
  }
  &-btn {
    padding: 2px 5px;
  }
  &-item {
    &-inner {
      flex-direction: row;
      align-items: center;
      padding-right: 20px;
    }
    &--active {
      background-color: $color-gray-light;
    }
    .q-item__section {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
