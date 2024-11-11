<template>
  <q-page>
    <div class="container">
      <h4 class="favorites-title">Избранное</h4>
      <div class="searchResult-empty" v-if="carsData.length == 0">Нет избранных объявлений</div>
      <div v-else>
        <div v-for="item in carsData" :key="item.guid" class="favorites-item" @click="router.push({ path: `/auto/${item.guid}` })">
          <div class="favorites-item-image">
            <img :src="`src/assets/img/cars/${item.images[0]}`" :alt="item.brand ? item.brand : ''" />
          </div>
          <div class="favorites-item-body">
            <div class="favorites-item-name">
              {{ getItemName(item) }}
            </div>
            <div class="favorites-item-price">{{ numberWithSpaces(item.price) }} ₽</div>
            <div class="favorites-item-mileage">
              {{ getItemInfo(item) }}
            </div>
            <div class="favorites-item-descr">
              {{ item.descr }}
            </div>
          </div>
          <div class="favorites-item-actions">
            <div class="action-favBtn">
              <q-icon v-if="isFavorite(item)" name="favorite" @click.stop="removeFromFav(item)" />
              <q-icon v-else name="favorite_border" @click.stop="addToFav(item)" />
            </div>
            <q-btn class="action-showNumber" color="secondary" icon="call" label="Показать номер" unelevated @click.stop="openPhoneModal(item)" />
          </div>
        </div>
      </div>
    </div>

    <PhoneModal v-model:showModal="showPhoneModal" :phone="openedPhone" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getItemInfo, numberWithSpaces, getItemName } from '@/utils/commons'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { CarItem } from '@/types'
import PhoneModal from '@/components/modals/PhoneModal.vue'

defineOptions({
  name: 'FavoritesPage',
})

const router = useRouter()

const userStore = useUserStore()
const { addToFav, removeFromFav } = userStore
const { favoritesCars } = storeToRefs(userStore)

const carsData = ref<CarItem[]>([])
const showPhoneModal = ref(false)
const openedPhone = ref('')

function openPhoneModal(item: CarItem) {
  openedPhone.value = item.author.phone
  showPhoneModal.value = true
}

function isFavorite(item: CarItem) {
  return favoritesCars.value.map((car) => car.guid).includes(item.guid)
}

onMounted(() => {
  carsData.value = [...favoritesCars.value]
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.action-favBtn {
  font-size: 1.25rem;
  color: $color-red;
  &:hover {
    opacity: 0.7;
  }
}

.favorites-title {
  padding-left: 8px;
  margin: 20px 0;
}

.favorites-item {
  display: flex;
  border-radius: 10px;
  transition: all 0.1s linear;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba($color-gray, 0.15);
    .action-showNumber {
      opacity: 1;
      visibility: visible;
    }
  }

  &-image {
    flex: 0 0 300px;
    height: 185px;
    border-radius: $main-border-raius;
    overflow: hidden;
    margin-right: 15px;
    img {
      @include image_center;
    }
  }

  &-body {
    flex-grow: 1;
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
    -webkit-line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &-actions {
    display: flex;
    flex: 0 0 220px;
    margin: 0 0 0 1.5rem;
    .action-showNumber {
      height: 40px;
      font-size: 0.75rem;
      line-height: 1rem;
      opacity: 0;
      visibility: hidden;
      &__content {
        display: flex;
        flex-wrap: nowrap;
        padding: 0;
      }
    }

    .action-favBtn {
      margin: 0.25rem 0.7rem 0 0;
    }
  }
}
</style>
