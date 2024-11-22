<template>
  <q-page>
    <div class="container container-small">
      <h4 class="profile-title">Профиль</h4>
      <div>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
          <q-tab name="main" label="Основная информация" />
          <q-tab name="password" label="Пароль" />
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
            </div>

            <div class="q-mb-md">
              <MyInput
                v-model="user.name"
                label="Имя"
                :class="[v$.user.name.$errors.length > 0 ? 'input--error' : '']"
                placeholder="Введите ваше имя"
                :isRequired="true"
              />
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
            </div>
            <div class="q-mb-md">
              <MyInput
                v-model="user.location"
                label="Город"
                :class="[v$.user.location.$errors.length > 0 ? 'input--error' : '']"
                placeholder="Введите ваш город"
                :isRequired="true"
              />
            </div>

            <q-btn class="full-width" color="primary" label="Сохранить" @click="saveData" :disabled="!isFormEdited || v$.$error" />
          </q-tab-panel>

          <q-tab-panel name="password">
            <div class="profile-oldpass q-mb-md">
              <MyInput v-model="user.password" label="Старый пароль" :type="showPassword ? 'password' : 'text'" readonly />
              <q-btn class="q-ml-md" color="primary" :outline="showPassword" @click="showPassword = !showPassword">
                {{ showPassword ? 'Показать' : 'Скрыть' }}
              </q-btn>
            </div>
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
              <div v-if="v$.newPasswordForm.newPassword.$errors.length" class="text-danger q-mt-xs">
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
              <div v-if="newPasswordForm.newPasswordRepeat.length && v$.newPasswordForm.newPasswordRepeat.$errors.length" class="text-danger q-mt-xs">
                Пароли не совпадают. Проверьте правильность введённых данных
              </div>
            </div>
            <q-btn class="full-width" color="primary" label="Сохранить" @click="saveNewPassword" :disabled="!isFormEdited" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <SuccessModal v-model:show-modal="showSuccessModal" :message="resultMessage" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { User } from '@/components/models'
import SuccessModal from '@/components/modals/SuccessModal.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
// import { deepEqualCheck } from '@/utils/commons'

defineOptions({
  name: 'ProfilePage',
})

const userStore = useUserStore()
const { updateUserData, updateUserPassword } = userStore
const { currentUser } = storeToRefs(userStore)

const showSuccessModal = ref(false)

const getDefaultUser = () =>
  <User>{
    login: '',
    password: '',
    name: '',
    location: '',
    avatar: '',
    phone: '',
    favorites: [],
  }
let user = ref<User>(getDefaultUser())
let userLogin = ref('')

const tab = ref('main')
const isFormEdited = ref(false)

const showPassword = ref(true)
const showNewPassword = ref(true)
const showNewPasswordRepeat = ref(true)
const newPasswordForm = ref({
  newPassword: '',
  newPasswordRepeat: '',
})

const resultMessage = ref('')

const rules = {
  user: {
    login: { required, minLength: minLength(4) },
    name: { required },
    location: { required },
    // avatar: { required },
    phone: { required },
  },
  newPasswordForm: {
    newPassword: { required, minLength: minLength(3) },
    newPasswordRepeat: { required, sameAs: sameAs(computed(() => newPasswordForm.value.newPassword)) },
  },
}

const v$ = useVuelidate(rules, { user, newPasswordForm })

async function saveData() {
  v$.value.$touch()
  if (v$.value.user.$errors.length) return
  updateUserData(userLogin.value, user.value)
  resultMessage.value = 'Данные профиля обновлены'
  await nextTick()
  isFormEdited.value = false
  showSuccessModal.value = true
}

async function saveNewPassword() {
  v$.value.$touch()
  if (v$.value.newPasswordForm.$errors.length) return
  updateUserPassword(userLogin.value, newPasswordForm.value.newPassword)
  resultMessage.value = 'Пароль успешно обновлён'
  await nextTick()
  isFormEdited.value = false
  showSuccessModal.value = true
}

function resetForm() {
  if (currentUser.value) {
    user.value = { ...currentUser.value }
    newPasswordForm.value.newPassword = ''
    newPasswordForm.value.newPasswordRepeat = ''
    v$.value.$reset()
    isFormEdited.value = false
  }
}

onMounted(() => {
  if (currentUser.value) {
    user.value = { ...currentUser.value }
    userLogin.value = user.value.login
    watch(
      user,
      async () => {
        isFormEdited.value = true
      },
      { deep: true }
    )
  }
})

watch(tab, () => {
  resetForm()
})
watch(
  newPasswordForm,
  () => {
    v$.value.$reset()
    isFormEdited.value = true
  },
  { deep: true }
)
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
@import '@/assets/scss/_mixins';

.profile-title {
  margin: 20px 0;
}

.profile-oldpass {
  display: flex;
  align-items: end;
  .q-btn {
    height: 40px;
  }
}
</style>
