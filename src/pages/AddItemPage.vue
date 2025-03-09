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
          v-model="newItem.color"
          :options="colorsList"
          :class="[v$.newItem.color.$errors.length > 0 ? 'input--error' : '']"
          :isRequired="true"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          selectedLabel="Не выбран"
          label="Цвет"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.engineType"
          :options="engineList"
          :class="[v$.newItem.engineType.$errors.length > 0 ? 'input--error' : '']"
          label="Двигатель"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          :isRequired="true"
          selectedLabel="Не выбрана"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="newItem.engineCapacity"
          :options="engineСapacityList"
          :class="[v$.newItem.engineCapacity.$errors.length > 0 ? 'input--error' : '']"
          :isRequired="true"
          option-value="type"
          option-label="name"
          emit-value
          map-options
          selectedLabel="Не выбран"
          label="Объём двигателя, л"
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
          option-value="type"
          option-label="name"
          emit-value
          map-options
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
          option-value="type"
          option-label="name"
          emit-value
          map-options
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
              v-model="inputFileModel"
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
          mask="# ### ### ###"
          reverse-fill-mask
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

    <InfoModal ref="infoModal" />
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, watch, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
import { CarItem, CarOption } from '@/models'
import { brands, colors, transmissionList, engineList, engineСapacityList, driveList } from '@/constants'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'
import { getImagesPath, getAttributeValue } from '@/utils/commons'
import InfoModal from '@/components/modals/InfoModal.vue'

defineOptions({
  name: 'AddItemPage',
})

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const infoModal = ref()
const isFormEdited = ref(false)

const brandList: string[] = Object.keys(brands)
const colorsList: CarOption[] = [...colors]
let modelList = ref<string[]>([])

const inputFileModel = ref<File[]>([])
const imagesList = ref<File[]>([])

type imgInObj = {
  [key: string]: File
}

const getCarItemDefault = () =>
  <CarItem>{
    idf: '',
    createDate: 0,
    changeDate: 0,
    images: [],
    brand: '',
    model: '',
    color: null,
    engineType: null,
    engineCapacity: null,
    drive: null,
    enginePower: null,
    transmission: null,
    leftHandDrive: true,
    year: null,
    mileage: null,
    price: null,
    descr: '',
    authorIdf: '',
    authorName: '',
    authorAvatar: '',
    authorPhone: '',
    authorLocation: '',
  }
const newItem = ref<CarItem>(getCarItemDefault())

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

const inputFiles = ref<HTMLElement | null>(null)

const inputFilesHanlder = (e: Event) => {
  const val = e.target as HTMLInputElement
  if (val.files?.length) imagesList.value = [...imagesList.value, ...val.files]
}

const removeImage = (file: File) => {
  imagesList.value = imagesList.value.filter((el) => el.name !== file.name)
}

const setModelList = (val: unknown) => {
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
    // if (newVal.price) {
    //   newVal.price = numberWithSpaces(newVal.price) + ''
    // }
  },
  { deep: true }
)

const getNewItemDto = () => {
  const newCar = newItem.value
  const imagesFiles = <imgInObj>{}
  imagesList.value.forEach((file, index) => {
    imagesFiles[`carImage${index}`] = file
  })

  return {
    ...newCar,
    price: newCar.price ? +String(newCar.price).replace(/\s+/g, '') : '',
    mileage: newCar.mileage ? +String(newCar.mileage).replace(/\s+/g, '') : '',
    engineCapacity: String(newCar.engineCapacity),
    enginePower: String(newCar.enginePower),
    authorIdf: currentUser.value ? currentUser.value.idf : '',
    authorName: currentUser.value ? currentUser.value.name : 'DefaultUser',
    authorAvatar: currentUser.value ? currentUser.value.avatar : '',
    authorPhone: currentUser.value ? currentUser.value.phone : 'No phone',
    authorLocation: currentUser.value ? currentUser.value.location : 'No location',
    createDate: Date.now(),
    changeDate: Date.now(),
    ...imagesFiles,
  }
}

async function formHandler() {
  v$.value.$touch()
  if (v$.value.$errors.length) return
  try {
    const resp = await Api.post('car/add', getNewItemDto(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (resp.success) {
      resetForm()
      infoModal.value?.openModal(resp.message, 'success')
    } else {
      infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  }
}

async function resetForm() {
  newItem.value = { ...getCarItemDefault() }
  imagesList.value = []
  v$.value.$reset()
  await nextTick()
  isFormEdited.value = false
}

onMounted(() => {
  watch(
    [newItem],
    async () => {
      v$.value.$reset()
      isFormEdited.value = true
    },
    { deep: true }
  )
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.container-small {
  max-width: 700px;
}

.input-file-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #000;
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
