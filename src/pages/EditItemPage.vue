<template>
  <q-page>
    <div class="container container-small">
      <h5 class="q-my-md">Редактировать объявление</h5>
      <div class="q-mb-md">
        <MySelect
          v-model="item.brand"
          :options="brandList"
          :disable="false"
          :class="[v$.item.brand.$errors.length > 0 ? 'input--error' : '']"
          label="Марка"
          :isRequired="true"
          selectedLabel="Не выбрана"
          @update:model-value="(val) => setModelList(val)"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="item.model"
          :options="modelList"
          :class="[v$.item.model.$errors.length > 0 ? 'input--error' : '']"
          label="Модель"
          :isRequired="true"
          selectedLabel="Не выбрана"
          :disable="!item.brand"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="item.year"
          mask="####"
          label="Год выпуска"
          :class="[v$.item.year.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Год"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="item.color"
          :options="colorsList"
          :class="[v$.item.color.$errors.length > 0 ? 'input--error' : '']"
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
          v-model="item.engineType"
          :options="engineList"
          :class="[v$.item.engineType.$errors.length > 0 ? 'input--error' : '']"
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
          v-model="item.engineCapacity"
          :options="engineСapacityList"
          :class="[v$.item.engineCapacity.$errors.length > 0 ? 'input--error' : '']"
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
          v-model="item.enginePower"
          mask="####"
          label="Мощность, л.с."
          :class="[v$.item.enginePower.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указан"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MySelect
          v-model="item.transmission"
          :options="transmissionList"
          :class="[v$.item.transmission.$errors.length > 0 ? 'input--error' : '']"
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
          v-model="item.drive"
          :options="driveList"
          :class="[v$.item.drive.$errors.length > 0 ? 'input--error' : '']"
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
          v-model="item.mileage"
          mask="# ### ### ###"
          reverse-fill-mask
          label="Пробег, км"
          :class="[v$.item.mileage.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указан"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <div class="form-control">
          <span class="form-control-label">Фотографии</span>
        </div>
        <div class="input-file-images">
          <div v-for="(image, i) in item.images" :key="i">
            <q-btn icon="close" size="10px" flat round dense @click="removeImage(image)" />
            <img :src="getImgSrc(image)" :alt="item.brand ? item.brand : ''" />
          </div>
          <div v-for="(image, i) in imagesList" :key="i">
            <q-btn icon="close" size="10px" flat round dense @click="removeFile(image)" />
            <img :src="getImagesPath(image)" :alt="item.brand ? item.brand : ''" />
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
          v-model="item.price"
          mask="# ### ### ###"
          reverse-fill-mask
          label="Цена, ₽"
          :class="[v$.item.price.$errors.length > 0 ? 'input--error' : '']"
          placeholder="Не указана"
          :isRequired="true"
        />
      </div>

      <div class="q-mb-md">
        <MyInput
          v-model="item.descr"
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
import { useRoute } from 'vue-router'
import { ref, watch, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
import { CarItem, CarOption } from '@/models'
import { brands, colors, transmissionList, engineList, engineСapacityList, driveList } from '@/constants'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'
import { getImagesPath, getImgSrc, getAttributeValue } from '@/utils/commons'
import InfoModal from '@/components/modals/InfoModal.vue'

defineOptions({
  name: 'EditItemPage',
})

const route = useRoute()
const idf = route.params.id

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
const item = ref<CarItem>(getCarItemDefault())

const rules = {
  item: {
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

const v$ = useVuelidate(rules, { item })

const inputFiles = ref<HTMLElement | null>(null)

const inputFilesHanlder = (e: Event) => {
  const val = e.target as HTMLInputElement
  if (val.files?.length) imagesList.value = [...imagesList.value, ...val.files]
}

const removeFile = (file: File) => {
  imagesList.value = imagesList.value.filter((el) => el.name !== file.name)
}
const removeImage = (image: string) => {
  item.value.images = item.value.images.filter((el) => el !== image)
}

const setModelList = (val: unknown) => {
  item.value.model = ''
  if (val && typeof val === 'string') {
    modelList.value = getAttributeValue(brands, val)
  } else {
    modelList.value = []
  }
}

watch(
  item,
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

const getItemDto = () => {
  const updatedCar = item.value
  console.log(item.value.images)
  const imagesFiles = <imgInObj>{}
  imagesList.value.forEach((file, index) => {
    imagesFiles[`carImage${index}`] = file
  })

  return {
    ...updatedCar,
    images: JSON.stringify(updatedCar.images),
    price: updatedCar.price ? +String(updatedCar.price).replace(/\s+/g, '') : '',
    mileage: updatedCar.mileage ? +String(updatedCar.mileage).replace(/\s+/g, '') : '',
    engineCapacity: String(updatedCar.engineCapacity),
    enginePower: String(updatedCar.enginePower),
    authorIdf: currentUser.value ? currentUser.value.idf : '',
    authorName: currentUser.value ? currentUser.value.name : 'DefaultUser',
    authorAvatar: currentUser.value ? currentUser.value.avatar : '',
    authorPhone: currentUser.value ? currentUser.value.phone : 'No phone',
    authorLocation: currentUser.value ? currentUser.value.location : 'No location',
    changeDate: Date.now(),
    ...imagesFiles,
  }
}

async function fetchCar() {
  try {
    const resp = await Api.get(`car/${idf}`)
    if (resp.success) {
      item.value = { ...resp.data }
      // imagesList.value.push(file)
    } else {
      // infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  }
}

async function formHandler() {
  v$.value.$touch()
  if (v$.value.$errors.length) return
  try {
    const resp = await Api.post('car/update', getItemDto(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (resp.success) {
      item.value = { ...resp.data }
      resetForm()
      infoModal.value?.openModal(resp.message, 'success')
    } else {
      infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  }
}

// const binary = atob(resp.data.images.split(',')[1])
// const array = []
// for (let i = 0; i < binary.length; i++) {
//   array.push(binary.charCodeAt(i))
// }
// const file = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
// console.log('--------file ')
// console.log(file)

async function resetForm() {
  inputFileModel.value = []
  imagesList.value = []
  v$.value.$reset()
  await nextTick()
  isFormEdited.value = false
}

onMounted(async () => {
  await fetchCar()
  watch(
    [item],
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
