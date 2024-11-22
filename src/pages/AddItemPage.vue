<template>
  <q-page>
    <div class="container container-small">
      <h5 class="q-my-md">Новое объявление</h5>
      <div class="q-mb-md">
        <MySelect
          v-model="newItem.brand"
          :options="brandList"
          :disable="false"
          :class="[v$.newItem.brand.$errors.length > 0 ? 'input--error' : '']"
          label="Марка"
          :isRequired="true"
          selectedLabel="Не выбрана"
          @update:model-value="(val) => setModelList(val)"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.model"
          :options="modelList"
          :class="[v$.newItem.model.$errors.length > 0 ? 'input--error' : '']"
          label="Модель"
          :isRequired="true"
          selectedLabel="Не выбрана"
          :disable="!newItem.brand"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.year"
          mask="####"
          label="Год выпуска"
          :class="[v$.newItem.year.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Год"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.engineType"
          :options="engineList"
          :class="[v$.newItem.engineType.$errors.length > 0 ? 'input--error' : '']"
          label="Двигатель"
          :isRequired="true"
          selectedLabel="Не выбрана"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.engineCapacity"
          mask="#.#"
          label="Объём двигателя, л"
          :class="[v$.newItem.engineCapacity.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указан"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.enginePower"
          mask="####"
          label="Мощность, л.с."
          :class="[v$.newItem.enginePower.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указан"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.transmission"
          :options="transmissionList"
          :class="[v$.newItem.transmission.$errors.length > 0 ? 'input--error' : '']"
          label="Коробка передач"
          :isRequired="true"
          selectedLabel="Не выбрана"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.drive"
          :options="driveList"
          :class="[v$.newItem.drive.$errors.length > 0 ? 'input--error' : '']"
          :isRequired="true"
          selectedLabel="Не выбран"
          label="Привод"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.mileage"
          mask="# ### ### ###"
          reverse-fill-mask
          label="Пробег, км"
          :class="[v$.newItem.mileage.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указан"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <div class="form-control">
          <span class="form-control-label">Фотографии</span>
        </div>
        <div class="input-file-images">
          <div v-for="(image, i) in imagesList" :key="i">
            <q-btn icon="close" size="10px" flat round dense @click="removeImage(image)" />
            <img :src="getImagesPath(image)" :alt="newItem.brand ? newItem.brand : ''" />
          </div>
          <label class="input-file-btn">
            <q-icon name="photo_camera" />
            <q-file
              ref="inputFiles"
              id="inputFiles"
              v-model="imagesList"
              class="input-file-field"
              placeholder="Не выбрано"
              :dense="true"
              square
              outlined
              multiple
              @input="(event: Event) => inputFilesHanlder(event)"
            />
          </label>
        </div>
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.price"
          label="Цена, ₽"
          :class="[v$.newItem.price.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указана"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="newItem.descr"
          label="Описание"
          placeholder="История обслуживания, недостатки и сильные стороны вашего автомобиля"
          type="textarea"
        />
      </div>
      <q-btn class="full-width q-mb-md" color="primary" label="Сохранить" @click="formHandler" :disabled="false" />
    </div>

    <SuccessModal v-model:show-modal="showSuccessModal" message="Объявление успешно добавлено!" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
import { CarItem } from '@/types'
import { brands } from '@/constants/brands'
import { engineTypes } from '@/constants/engine'
import { drives } from '@/constants/drive'
import { transmissions } from '@/constants/transmission'
import { ListItem } from '@/components/models'
import { numberWithSpaces } from '@/utils/commons'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'
import { useCarsStore } from '@/stores/cars'
import SuccessModal from '@/components/modals/SuccessModal.vue'

defineOptions({
  name: 'AddItemPage',
})

const carsStore = useCarsStore()
const { addItem } = carsStore

const userStore = useUserStore()
const { currentUser } = userStore

const brandList: string[] = Object.keys(brands)
const engineList: ListItem[] = Object.values(engineTypes)
const transmissionList: ListItem[] = Object.values(transmissions)
const driveList: ListItem[] = Object.values(drives)
let modelList = ref<string[]>([])

const imagesList = ref<File[]>([])

type Attributes = {
  [key: string]: string[]
}

const newItem = ref<CarItem>({
  images: [],
  brand: '',
  model: '',
  color: '',
  engineType: null,
  engineCapacity: null,
  drive: null,
  enginePower: null,
  transmission: null,
  leftHandDrive: true,
  year: null,
  mileage: null,
  price: '',
  descr: '',
  guid: '',
  author: {
    name: '',
    avatar: '',
    phone: '',
    location: '',
  },
})

const rules = {
  newItem: {
    brand: { required },
    model: { required },
    color: { required },
    engineType: { required },
    engineCapacity: { required },
    drive: { required },
    enginePower: { required },
    transmission: { required },
    leftHandDrive: { required },
    year: { required },
    mileage: { required },
    price: { required },
  },
}

const v$ = useVuelidate(rules, { newItem })

function getAttributeValue<T extends Attributes>(obj: T, key: keyof T) {
  return obj[key]
}

const inputFiles = ref<HTMLElement | null>(null)

const inputFilesHanlder = (e: Event) => {
  const val = e.target as HTMLInputElement
  console.log(val.files)
}

const getImagesPath = (file: File) => {
  let path
  // let reader = new FileReader()
  // reader.onload = (event) => {
  //   if (event.target && typeof event.target.result === 'string') {
  //     path = event.target.result
  //   }
  // }
  // reader.readAsDataURL(file)
  path = URL.createObjectURL(file)

  // console.log('path', path, file)
  return path
}

const removeImage = (file: File) => {
  imagesList.value = imagesList.value.filter((el) => el.name !== file.name)
  console.log(file)
}

const setModelList = (val: string | number | ListItem | null) => {
  newItem.value.model = ''
  if (val && typeof val === 'string') {
    modelList.value = getAttributeValue(brands, val)
  } else {
    modelList.value = []
  }
}

watch(
  newItem,
  async (newVal: CarItem) => {
    if (newVal.brand) {
      modelList.value = getAttributeValue(brands, newVal.brand)
    } else {
      modelList.value = []
    }
    if (newVal.price) {
      newVal.price = numberWithSpaces(newVal.price) + ''
    }
  },
  { deep: true }
)

const getNewItemDto = (): CarItem => {
  const newCar = newItem.value
  return {
    ...newCar,
    engineCapacity: Number(newCar.engineCapacity),
    enginePower: Number(newCar.enginePower),
    guid: String(new Date().getTime()),
    author: {
      name: currentUser ? currentUser.name : 'DefaultUser',
      avatar: currentUser ? currentUser.avatar : '',
      phone: currentUser ? currentUser.phone : 'No phone',
      location: currentUser ? currentUser.location : 'No location',
    },
  }
}

const showSuccessModal = ref(false)

const formHandler = () => {
  v$.value.$touch()
  if (v$.value.$errors.length) return
  addItem(getNewItemDto())
  showSuccessModal.value = true
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.container-small {
  max-width: 700px;
}

.input-file-images {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin: 5px 0 0;
  & > div {
    height: 85px;
    border-radius: $main-border-raius;
    overflow: hidden;
    position: relative;
    img {
      @include image_center;
    }

    .q-btn {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #fff;
      background-color: rgba(#000, 0.5);
    }
  }
}
</style>
