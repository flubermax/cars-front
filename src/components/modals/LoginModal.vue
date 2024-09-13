<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-login">
      <q-card-section class="row q-py-none">
        <q-space />
        <q-btn icon="close" flat round dense @focus="closeModal" />
      </q-card-section>
      <q-card-section class="modal-login-body">
        <h4 class="q-mb-lg">Вход</h4>

        <div class="q-mb-md">
          <my-input
            v-model="userForm.login"
            :class="[v$.userForm.login.$errors.length > 0 || authError ? 'input--error' : '']"
            placeholder="Логин"
            @input="authError = false"
          ></my-input>
          <div v-if="v$.userForm.login.$errors.length" class="text-danger q-mt-xs">Введите логин</div>
        </div>

        <div class="q-mb-md">
          <my-input
            v-model="userForm.password"
            :class="[v$.userForm.password.$errors.length > 0 || authError ? 'input--error' : '']"
            placeholder="Пароль"
            @input="authError = false"
          ></my-input>
          <div v-if="v$.userForm.password.$errors.length" class="text-danger q-mt-xs">Введите пароль</div>
        </div>

        <q-btn color="primary" :disable="!isFormFilled && authError" @click="auth">Войти</q-btn>
        <div v-if="authError && isFormFilled" class="text-danger q-mt-xs q-mb-md">Неверный логин или пароль</div>
      </q-card-section>
      <q-card-section class="modal-login-footer">
        <div class="q-mb-md">Нет аккаунта?</div>
        <q-btn color="secondary" @click="openRegisterModal">Зарегистрироваться</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import MyInput from '@/components/UI/MyInput.vue'
import { useUserStore } from '@/stores/user'
// import { storeToRefs } from 'pinia'

type Props = {
  showModal: boolean
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
  (event: 'openRegisterModal'): void
}

type UserForm = {
  login: string
  password: string
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)

const userStore = useUserStore()
// const { currentUser } = storeToRefs(userStore)
const { loginHandler } = userStore

const userForm = ref<UserForm>({
  login: '',
  password: '',
})
const authError = ref(false)
const isFormFilled = computed(() => {
  return Boolean(userForm.value.login.length && userForm.value.password.length)
})

const rules = {
  userForm: {
    login: { required },
    password: { required },
  },
}

const v$ = useVuelidate(rules, { userForm })

async function auth() {
  v$.value.$touch()
  const isAuth = loginHandler(userForm.value.login, userForm.value.password)
  console.log('--- isAuth')
  console.log(isAuth)
  await nextTick()
  if (isAuth) {
    closeModal()
  } else {
    authError.value = true
  }
}

function resetForm() {
  userForm.value.login = ''
  userForm.value.password = ''
  authError.value = false
  v$.value.$reset()
}

function closeModal() {
  emit('update:showModal', false)
  resetForm()
}

function openRegisterModal() {
  closeModal()
  emit('openRegisterModal')
}

watch(
  userForm,
  () => {
    authError.value = false
  },
  { deep: true }
)
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
</style>
