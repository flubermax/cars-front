<template>
  <q-page>
    <div class="container container-small">
      <h4 class="profile-title">Профиль</h4>
      <div>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
          <q-tab name="main" label="Основная информация" />
          <q-tab name="password" label="Изменить пароль" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="main">
            <div class="q-mb-md">
              <MyInput
                v-model="user.login"
                label="Логин"
                :class="[v$.user.login.$errors.length > 0 ? 'input--error' : '']"
                placeholder="Введите логин"
                :isRequired="true"
              />
              <div v-if="v$.user.login.$errors.length" class="text-danger q-mt-xs">Обязательное поле</div>
            </div>

            <div class="q-mb-md">
              <MyInput v-model="user.name" label="Имя" placeholder="Введите ваше имя" class="text-capitalize" />
            </div>
            <div class="q-mb-md">
              <MyInput
                v-model="user.phone"
                label="Телефон"
                :class="[v$.user.phone.$errors.length > 0 ? 'input--error' : '']"
                mask="+7 (9##) ### ## ##"
                placeholder="+7 (9"
                :isRequired="true"
              />
              <div v-if="v$.user.phone.$errors.length && v$.user.phone.required.$invalid" class="text-danger q-mt-xs">Обязательное поле</div>
              <div v-if="v$.user.phone.$errors.length && v$.user.phone.minLength.$invalid" class="text-danger q-mt-xs">
                Некорректный номер. Проверьте правильность введённых данных
              </div>
            </div>
            <div class="q-mb-md">
              <MyInput
                v-model="user.location"
                label="Город"
                :class="[v$.user.location.$errors.length > 0 ? 'input--error' : '', 'text-capitalize']"
                placeholder="Введите ваш город"
                :isRequired="true"
              />
              <div v-if="v$.user.location.$errors.length" class="text-danger q-mt-xs">Обязательное поле</div>
            </div>
            <div class="q-mb-md">
              <div class="form-control">
                <span class="form-control-label">Изображение профиля</span>
              </div>
              <div class="input-file-images overflow-hidden">
                <div v-if="user.avatar || userAvatar">
                  <q-btn icon="close" size="10px" flat round dense @click="removeUserAvatar" />
                  <img v-if="userAvatar" :src="getImagesPath(userAvatar)" alt="User avatar" />
                  <img v-else :src="getImgSrc(user.avatar)" alt="User avatar" />
                </div>
                <div v-else class="input-file-empty">Изображение отсутствует</div>
                <label class="input-file-btn">
                  <q-icon name="photo_camera" />
                  <q-file
                    ref="inputFiles"
                    id="inputFiles"
                    v-model="userAvatar"
                    class="input-file-field"
                    placeholder="Не выбрано"
                    :dense="true"
                    square
                    outlined
                  />
                </label>
              </div>
            </div>

            <q-btn class="full-width" color="primary" label="Сохранить" @click="saveData" :disabled="!isFormEdited || v$.$error" />
          </q-tab-panel>

          <q-tab-panel name="password">
            <!-- <div class="profile-oldpass q-mb-md">
              <MyInput v-model="user.password" label="Старый пароль" :type="showPassword ? 'password' : 'text'" readonly />
              <q-btn class="q-ml-md" color="primary" :outline="showPassword" @click="showPassword = !showPassword">
                {{ showPassword ? 'Показать' : 'Скрыть' }}
              </q-btn>
            </div> -->
            <div class="q-mb-md">
              <my-input
                v-model="newPasswordForm.newPassword"
                label="Новый пароль"
                :class="['q-mb-md', v$.newPasswordForm.newPassword.$errors.length ? 'input--error' : '']"
                :type="showNewPassword ? 'password' : 'text'"
                placeholder="Пароль"
                :isRequired="true"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showNewPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showNewPassword = !showNewPassword"
                  />
                </template>
              </my-input>
              <div
                v-if="v$.newPasswordForm.newPassword.$errors.length && v$.newPasswordForm.newPassword.required.$invalid"
                class="text-danger q-mt-xs"
              >
                Введите пароль
              </div>
              <div
                v-if="v$.newPasswordForm.newPassword.$errors.length && v$.newPasswordForm.newPassword.minLength.$invalid"
                class="text-danger q-mt-xs"
              >
                Пароль должен состоять минимум из 3 символов.
              </div>
            </div>
            <div class="q-mb-md">
              <my-input
                v-model="newPasswordForm.newPasswordRepeat"
                label="Новый пароль ещё раз"
                :class="['q-mb-md', v$.newPasswordForm.newPasswordRepeat.$errors.length ? 'input--error' : '']"
                :type="showNewPasswordRepeat ? 'password' : 'text'"
                placeholder="Пароль ещё раз"
                :isRequired="true"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showNewPasswordRepeat ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showNewPasswordRepeat = !showNewPasswordRepeat"
                  />
                </template>
              </my-input>
              <div
                v-if="v$.newPasswordForm.newPasswordRepeat.$errors.length && v$.newPasswordForm.newPasswordRepeat.required.$invalid"
                class="text-danger q-mt-xs"
              >
                Введите пароль
              </div>
              <div
                v-if="
                  newPasswordForm.newPasswordRepeat.length &&
                  v$.newPasswordForm.newPasswordRepeat.$errors.length &&
                  v$.newPasswordForm.newPasswordRepeat.sameAs.$invalid
                "
                class="text-danger q-mt-xs"
              >
                Пароли не совпадают. Проверьте правильность введённых данных
              </div>
            </div>
            <q-btn class="full-width" color="primary" label="Сохранить" @click="saveNewPassword" :disabled="!isFormEdited" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <InfoModal ref="infoModal" />
  </q-page>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { User } from '@/models'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import { getImagesPath, getImgSrc, capitalizeFirstLetter } from '@/utils/commons'
import InfoModal from '@/components/modals/InfoModal.vue'
import MyInput from '@/components/UI/MyInput.vue'

defineOptions({
  name: 'ProfilePage',
})

const router = useRouter()
const userStore = useUserStore()
const { updateUserData } = userStore
const { currentUser } = storeToRefs(userStore)

const infoModal = ref()

const getDefaultUser = () =>
  <User>{
    idf: '',
    login: '',
    password: '',
    name: '',
    location: '',
    avatar: '',
    phone: '',
    favorites: [],
    roles: [],
  }
let user = ref<User>(getDefaultUser())
let userAvatar = ref<File | null>(null)

const tab = ref('main')
const isFormEdited = ref(false)

// const showPassword = ref(true)
const showNewPassword = ref(true)
const showNewPasswordRepeat = ref(true)
const newPasswordForm = ref({
  newPassword: '',
  newPasswordRepeat: '',
})

const rules = {
  user: {
    login: { required, minLength: minLength(4) },
    location: { required },
    phone: { required, minLength: minLength(18) },
  },
  newPasswordForm: {
    newPassword: { required, minLength: minLength(3) },
    newPasswordRepeat: { required, sameAs: sameAs(computed(() => newPasswordForm.value.newPassword)) },
  },
}

const v$ = useVuelidate(rules, { user, newPasswordForm })

function getUserDataDto() {
  return {
    ...user.value,
    name: capitalizeFirstLetter(user.value.name),
    location: capitalizeFirstLetter(user.value.location),
    avatarFile: userAvatar.value ? userAvatar.value : '',
  }
}

async function saveData() {
  v$.value.$touch()
  if (v$.value.user.$errors.length) return
  try {
    const resp = await Api.post('user/update-profile', getUserDataDto(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (resp.success) {
      updateUserData(resp.data)
      resetForm()
      infoModal.value?.openModal(resp.message, 'success')
    } else {
      infoModal.value?.openModal(resp.message, 'error')
    }
  } catch (error) {
    console.log(error)
  }
}

async function saveNewPassword() {
  v$.value.$touch()
  if (v$.value.newPasswordForm.$errors.length) return
  try {
    const resp = await Api.post('user/update-password', { ...getUserDataDto(), newPassword: newPasswordForm.value.newPassword })
    if (resp.success) {
      resetForm()
      infoModal.value?.openModal(resp.message, 'success')
    }
  } catch (error) {
    console.log(error)
  }
}

function removeUserAvatar() {
  userAvatar.value = null
  user.value.avatar = ''
}

async function resetForm() {
  if (currentUser.value) {
    user.value = { ...currentUser.value }
    userAvatar.value = null
    newPasswordForm.value.newPassword = ''
    newPasswordForm.value.newPasswordRepeat = ''
    v$.value.$reset()
    // showPassword.value = true
    await nextTick()
    isFormEdited.value = false
  }
}

onMounted(() => {
  if (currentUser.value) {
    user.value = { ...currentUser.value }
  }
  watch(
    [user, userAvatar],
    async () => {
      v$.value.$reset()
      isFormEdited.value = true
    },
    { deep: true }
  )
})

watch(
  currentUser,
  async () => {
    if (currentUser.value) {
      user.value = { ...currentUser.value }
      await nextTick()
      v$.value.$reset()
      isFormEdited.value = false
    } else {
      router.push('/')
    }
  },
  { deep: true }
)

watch(
  newPasswordForm,
  () => {
    v$.value.$reset()
    isFormEdited.value = true
  },
  { deep: true }
)

watch(tab, () => {
  resetForm()
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.profile-title {
  margin: 20px 0;
}

// .profile-oldpass {
//   display: flex;
//   align-items: end;
//   .q-btn {
//     height: 40px;
//   }
// }
</style>
