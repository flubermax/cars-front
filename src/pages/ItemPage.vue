<template>
  <q-page>
    <div v-if="item" class="container">
      <div class="row justify-between q-py-md">
        <h4 class="item-page-title">{{ itemTitle }}</h4>
        <span class="item-page-title">{{ numberWithSpaces(item.price) }} ₽</span>
      </div>
      <div class="row justify-between item-page-top q-py-md">
        <div class="item-page-user">
          <div class="user-avatar">
            <img :src="item.author.avatar" alt="" />
          </div>
          <div class="user-info">
            <div class="user-info-name">
              {{ item.author.name }}
            </div>
            <div class="user-info-place">
              <!-- {{ item.author.place }} -->
              Город в котором находится
            </div>
          </div>
        </div>
        <div class="item-page-actions">
          <div class="action-message q-mr-md">
            <q-icon name="chat" class="q-mr-xs" />
            Написать
          </div>
          <q-btn class="action-number" color="secondary" icon="call" label="Показать номер" unelevated @click="showPhoneModal = true" />
        </div>
      </div>
      <div class="row justify-between q-py-lg">
        <div class="item-page-info">
          <div>
            <h4 class="q-mb-md">Характеристики</h4>
            <div class="q-mb-md"><span class="text-gray">Год выпуска:</span> {{ item.year }}</div>
            <div class="q-mb-md"><span class="text-gray">Пробег:</span> {{ numberWithSpaces(item.mileage) }} км</div>
            <div class="q-mb-md"><span class="text-gray">Двигатель:</span> {{ getEngineInfo() }}</div>
            <div class="q-mb-md"><span class="text-gray">Коробка:</span> {{ transmissions[item.transmission].name }}</div>
            <div class="q-mb-md"><span class="text-gray">Привод:</span> {{ drives[item.drive].name }}</div>
            <div class="q-mb-md"><span class="text-gray">Руль:</span> {{ item.leftHandDrive ? 'Левый' : 'Правый' }}</div>
          </div>

          <div class="q-mt-lg">
            <h4 class="q-mb-md">Описание</h4>
            <div class="item-page-descr">{{ item.descr }}</div>
          </div>
        </div>
        <div class="item-page-content">
          <div class="item-page-slider">
            <q-carousel v-model="currentSlide">
              <q-carousel-slide
                v-for="(image, i) in item.images"
                :key="i"
                :name="i + 1"
                transition-prev="slide-right"
                transition-next="slide-left"
                animated
                :img-src="`src/assets/img/cars/${image}`"
                @click="openSliderModal"
              />
            </q-carousel>
          </div>
          <div v-if="item.images.length > 1" class="item-page-images">
            <div v-for="(image, i) in item.images" :key="i" @mouseenter="setActiveSlide(i)">
              <img :src="`src/assets/img/cars/${image}`" :alt="item.brand" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Упс. Такого объявления не существует</div>

    <div v-if="showSliderModal" id="slider-modal">
      <div class="modal-slider-backdrop" @click.stop="closeSliderModal"></div>
      <q-card class="modal-slider-body">
        <q-icon name="close" class="modal-slider-close" @click="closeSliderModal" />
        <q-carousel v-model="currentSlide">
          <q-carousel-slide v-for="(image, i) in item?.images" :key="i" :name="i + 1" :img-src="`src/assets/img/cars/${image}`" />
        </q-carousel>
        <div v-if="item.images.length > 1" class="modal-slider-btn modal-slider-btn--prev" @click="leafSlidePrev">
          <q-icon name="chevron_left" />
        </div>
        <div v-if="item.images.length > 1" class="modal-slider-btn modal-slider-btn--next" @click="leafSlideNext">
          <q-icon name="chevron_right" />
        </div>
      </q-card>
      <div class="modal-slider-nav">
        <div v-for="(image, i) in item?.images" :key="i" :class="{ active: i + 1 == currentSlide }" @click="setActiveSlide(i)">
          <img :src="`src/assets/img/cars/${image}`" :alt="item?.brand" />
        </div>
        <!-- <q-carousel v-model="currentSlide" vertical>
          <q-carousel-slide v-for="(image, i) in item?.images" :key="i" :name="i + 1" :img-src="`src/assets/img/cars/${image}`" />
        </q-carousel> -->
      </div>
    </div>

    <q-dialog v-model="showPhoneModal">
      <q-card class="modal-phone">
        <q-card-section class="row q-pa-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="modal-phone-body">
          <div class="text-gray q-mb-xs">Телефон для связи:</div>
          <div>{{ item?.author.phone }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { autoMock } from '@/mock'
import { numberWithSpaces } from '@/utils/commons'
import { computed } from 'vue'
import { transmissions } from '@/constants/transmission'
import { engines } from '@/constants/engine'
import { drives } from '@/constants/drive'
import { CarItem } from '@/types'
// import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'ItemPage',
})

// const router = useRouter()
const route = useRoute()
const guid = route.params.id

const getDefaultItem = () =>
  <CarItem>{
    images: [],
    brand: '',
    model: '',
    color: '',
    engineType: 'gas',
    engineCapacity: 0,
    drive: 'FWD',
    enginePower: 0,
    transmission: 'MT',
    leftHandDrive: true,
    year: 2000,
    mileage: 0,
    price: 0,
    descr: '',
    guid: '',
    author: {
      name: '',
      avatar: '',
      phone: '',
    },
  }
let item = ref<CarItem>(getDefaultItem())

const currentSlide = ref<number>(1)
const showSliderModal = ref<boolean>(false)
const showPhoneModal = ref<boolean>(false)
const imagesCount = computed(() => item.value.images.length)

const itemTitle = computed(() => {
  return `${item.value.brand} ${item.value.model}, ${item.value.year}`
})

function setActiveSlide(imgIndex: number): void {
  currentSlide.value = imgIndex + 1
}

function openSliderModal(): void {
  const body = document.querySelector('body')
  body?.classList.add('no-scroll')
  showSliderModal.value = true
}

function closeSliderModal(): void {
  const body = document.querySelector('body')
  body?.classList.remove('no-scroll')
  showSliderModal.value = false
}

function leafSlidePrev(): void {
  currentSlide.value == 1 ? (currentSlide.value = Number(imagesCount.value)) : (currentSlide.value -= 1)
}

function leafSlideNext(): void {
  currentSlide.value == Number(imagesCount.value) ? (currentSlide.value = 1) : (currentSlide.value += 1)
}

function getEngineInfo(): string {
  return `${item.value.engineCapacity.toFixed(1)} л / ${item.value.enginePower} л.с. / ${engines[item.value.engineType].name}`
}

onMounted(() => {
  item.value = autoMock.find((el) => el.guid === guid) || getDefaultItem()
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
.item-page-title {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
}
.item-page-info {
  flex: 0 0 40%;
  font-size: 1.2rem;
}
.item-page-content {
  flex: 0 0 60%;
  padding: 0 0 0 1rem;
}
.item-page-slider {
  height: 450px;
  border-radius: $main-border-raius;
  overflow: hidden;
  .q-carousel {
    height: 100%;
    &:hover {
      cursor: zoom-in;
    }
  }
}
.item-page-images {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin: 2px 0 0;
  & > div {
    height: 75px;
    border-radius: $main-border-raius;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
      vertical-align: top;
    }
  }
}

#slider-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  padding: 5px 5px 5px 200px;

  .q-dialog {
    display: flex;
    justify-content: center;
  }
  .q-dialog__inner {
    max-width: calc(100% - 200px);
    padding: 5px;
  }
}

.modal-slider-body {
  width: calc(100% - 200px);
  height: 100%;
  padding: 0;
  position: relative;
  z-index: 3002;
  .q-panel-parent {
    overflow: visible;
  }
  .q-carousel {
    height: 100%;
  }
  .q-carousel__slide {
    background-size: contain;
    background-repeat: no-repeat;
  }
  .q-carousel__navigation {
    bottom: -65px;
  }
  .q-carousel__thumbnail {
    width: 70px;
    object-fit: cover;
    object-position: center;
  }
}
.modal-slider-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3001;
}
.modal-slider-close {
  position: absolute;
  top: -5px;
  right: -40px;
  z-index: 3002;
  font-size: 40px;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.modal-slider-btn {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  cursor: pointer;
  .q-icon {
    font-size: 60px;
    color: #fff;
    text-shadow: 0 0 3px #000;
  }
  &--prev {
    left: 0;
  }
  &--next {
    right: 0;
  }
  &:hover {
    background-color: rgba(#000, 0.3);
  }
}
.modal-slider-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3002;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & > div {
    flex-shrink: 0;
    width: 100px;
    height: 65px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      border: 2px solid rgba(0, 0, 0, 0);
    }
    &:hover::after {
      border-color: $color-blue--hover;
    }
    &.active::after {
      border-color: $color-blue;
    }
    img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
      vertical-align: top;
    }
  }
}

.item-page-user {
  display: flex;
  align-items: center;
}
.user-info {
  &-name {
    font-weight: 600;
  }
  &-place {
    color: $color-gray;
  }
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  margin: 0 15px 0 0;
}

.item-page-actions {
  display: flex;
  align-items: center;
}

.action-message {
  font-weight: 500;
  color: $color-blue;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}

.item-page-top {
  padding: 0.5rem;
  box-shadow: 0 0 2px 1px rgba(#000, 0.075);
}

body.no-scroll {
  padding-right: 15px;
}

.modal-phone {
  width: 350px;
  padding: 1rem 2rem 2rem;
  &-body {
    font-size: 1.1rem;
  }
}
</style>
