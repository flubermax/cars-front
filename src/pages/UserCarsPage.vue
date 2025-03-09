<template>
  <q-page>
    <div class="container">
      <h4 class="favorites-title">Мои объявления</h4>
      <div v-if="isLoading">Идёт загрузка...</div>
      <div v-else>
        <div class="searchResult-empty" v-if="items.length == 0">У вас нет опубликованных объявлений</div>
        <div v-else>
          <MainPageItem
            v-for="(item, itemIndex) in items"
            :key="item.idf"
            :item="item"
            :itemIndex="itemIndex"
            :itemSlideValue="itemSlideValue"
            :mainMode="false"
            @deleteItem="deleteItem"
            @click="router.push({ path: `/auto/${item.idf}` })"
          />
        </div>
      </div>
    </div>

    <InfoModal ref="infoModal" />
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { Dialog } from 'quasar'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { CarItem, SlideAttributes } from '@/models'
import MainPageItem from '@/components/CarItemFull.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import InfoModal from '@/components/modals/InfoModal.vue'

defineOptions({
  name: 'UserCarsPage',
})

const router = useRouter()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const infoModal = ref()
const items = ref<CarItem[]>([])
const isLoading = ref(false)

function setSlides() {
  items.value.forEach((car, i) => {
    if (car.idf) {
      itemSlideValue.value[i] = 1
    }
  })
}

async function fetchCars() {
  try {
    isLoading.value = true
    const resp = await Api.get(`car/user-cars/${currentUser.value?.idf}`)
    if (resp.success) {
      items.value = [...resp.data]
      setSlides()
    } else {
      // infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

async function deleteItem(idf: string) {
  Dialog.create({
    component: ConfirmModal,
    componentProps: {
      // title: 'Внимание',
      message: 'Вы уверены, что хотите удалить объявление?',
      okText: 'Удалить',
      cancelText: 'Отмена',
      cancel: true,
      persistent: true,
    },
  })
    .onOk(async () => {
      console.log('okaaaaaaaaay')
      try {
        const resp = await Api.get(`car/delete/${idf}`)
        if (resp.success) {
          infoModal.value?.openModal(resp.message, 'success')
          fetchCars()
        } else {
          infoModal.value?.openModal(resp.message, 'error')
        }
      } catch (error) {
        console.log(error)
      }
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('OK and Cancel')
    })
}

const itemSlideValue = ref<SlideAttributes>({})

onMounted(() => {
  if (!currentUser.value?.idf) {
    watch(
      currentUser,
      () => {
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
// @import '@/assets/scss/_vars';
// @import '@/assets/scss/_mixins';
</style>
