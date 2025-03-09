<template>
  <q-page>
    <div class="container">
      <h4 class="favorites-title">Избранное</h4>
      <div v-if="isLoading">Идёт загрузка...</div>
      <div v-else>
        <div class="searchResult-empty" v-if="items.length == 0">Нет избранных объявлений</div>
        <div v-else>
          <CarItemSimple v-for="item in items" :key="item.idf" :item="item" @openPhoneModal="openPhoneModal" />
        </div>
      </div>
    </div>

    <PhoneModal v-model:showModal="showPhoneModal" :phone="openedPhone" />
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { CarItem } from '@/models'
import PhoneModal from '@/components/modals/PhoneModal.vue'
import CarItemSimple from '@/components/CarItemSimple.vue'

defineOptions({
  name: 'FavoritesPage',
})

const userStore = useUserStore()
const { favoritesCars } = storeToRefs(userStore)

const items = ref<CarItem[]>([])
const showPhoneModal = ref(false)
const openedPhone = ref('')
const isLoading = ref(false)

function openPhoneModal(item: CarItem) {
  openedPhone.value = item.authorPhone
  showPhoneModal.value = true
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
</style>
