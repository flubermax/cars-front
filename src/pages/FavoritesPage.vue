<template>
  <q-page>
    <div class="container">
      <h4 class="favorites-title">Избранное</h4>
      <div v-if="isLoading">Идёт загрузка...</div>
      <div v-else>
        <div class="searchResult-empty" v-if="items.length == 0">Нет избранных объявлений</div>
        <div v-else>
          <div v-for="item in items" :key="item.idf" class="favorites-item" @click="router.push({ path: `/auto/${item.idf}` })">
            <div class="favorites-item-image">
              <img :src="getFavItemImage(item)" :alt="item.brand ? item.brand : ''" />
            </div>
            <div class="favorites-item-body">
              <div class="favorites-item-name">
                {{ getItemName(item) }}
              </div>
              <div class="favorites-item-price">{{ item.price ? numberWithSpaces(item.price) : 0 }} ₽</div>
              <div class="favorites-item-mileage">
                {{ getItemInfo(item) }}
              </div>
              <div class="favorites-item-descr">
                {{ item.descr }}
              </div>
            </div>
            <div class="favorites-item-actions">
              <div class="action-favBtn" @click.stop="addToFav(item)">
                <q-icon v-if="isFavorite(item)" name="favorite" />
                <q-icon v-else name="favorite_border" />
              </div>
              <q-btn class="action-showNumber" color="secondary" icon="call" label="Показать номер" unelevated @click.stop="openPhoneModal(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <PhoneModal v-model:showModal="showPhoneModal" :phone="openedPhone" />
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getItemInfo, getItemName, numberWithSpaces, getImgSrc } from '@/utils/commons'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { CarItem } from '@/types'
import PhoneModal from '@/components/modals/PhoneModal.vue'

defineOptions({
  name: 'FavoritesPage',
})

const router = useRouter()

const userStore = useUserStore()
const { addToFav } = userStore
const { favoritesCars } = storeToRefs(userStore)

const items = ref<CarItem[]>([])
const showPhoneModal = ref(false)
const openedPhone = ref('')
const isLoading = ref(false)

function openPhoneModal(item: CarItem) {
  openedPhone.value = item.authorPhone
  showPhoneModal.value = true
}

function isFavorite(item: CarItem) {
  return favoritesCars.value.includes(item.idf)
}

function getFavItemImage(item: CarItem): string {
  if (item.images.length) {
    return getImgSrc(item.images[0])
  } else {
    return 'defaultcar.jpg'
  }
}

async function fetchCars() {
  try {
    isLoading.value = true
    const resp = await Api.post('car/favorites', { idfs: Array.from(favoritesCars.value) })
    if (resp.success) {
      items.value = [...resp.data]
    } else {
      // infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (favoritesCars.value.length == 0) {
    watch(
      favoritesCars,
      async () => {
        fetchCars()
      },
      { once: true }
    )
  } else {
    fetchCars()
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';
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
